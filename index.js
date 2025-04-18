import { useEffect, useState } from "react";

export default function Home() {
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [hrv, setHrv] = useState(45); // dummy HRV
  const [fatigueDetected, setFatigueDetected] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        setSpotifyConnected(true);
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (hrv < 40 && accessToken) {
      setFatigueDetected(true);
      playRelaxingPlaylist();
    } else {
      setFatigueDetected(false);
    }
  }, [hrv, accessToken]);

  const playRelaxingPlaylist = async () => {
    const playlistUri = "spotify:playlist:37i9dQZF1DX3rxVfibe1L0";
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context_uri: playlistUri,
        offset: { position: 0 },
        position_ms: 0,
      }),
    });
  };

  const handleSpotifyConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = window.location.origin;
    const scopes = [
      "user-read-playback-state",
      "user-modify-playback-state",
      "streaming",
      "user-read-private",
      "user-read-email"
    ];

    const authUrl = \`https://accounts.spotify.com/authorize?client_id=\${clientId}&response_type=token&redirect_uri=\${encodeURIComponent(redirectUri)}&scope=\${encodeURIComponent(scopes.join(" "))}\`;

    window.location.href = authUrl;
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>ConnectYourPulse</h1>
      <p>Status Spotify: {spotifyConnected ? "Connected ✅" : "Not Connected ❌"}</p>
      {!spotifyConnected && <button onClick={handleSpotifyConnect}>Connect to Spotify</button>}
      <div style={{ marginTop: "1rem" }}>
        <p>Current HRV: {hrv} ms</p>
        {fatigueDetected && <p style={{ color: "red" }}>Fatigue detected! 🎵 Relaxing music playing...</p>}
      </div>
    </div>
  );
}