import { useEffect, useState } from "react";

export default function Home() {
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [hrv, setHrv] = useState(45); // dummy HRV value
  const [fatigueDetected, setFatigueDetected] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Parse access token from URL
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
    // Fatigue logic
    if (hrv < 40 && accessToken) {
      setFatigueDetected(true);
      playRelaxingPlaylist();
    } else {
      setFatigueDetected(false);
    }
  }, [hrv, accessToken]);

  const playRelaxingPlaylist = async () => {
    const playlistUri = "spotify:playlist:37i9dQZF1DX3rxVfibe1L0"; // Chill Hits

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
    const clientId = "YOUR_SPOTIFY_CLIENT_ID"; // Ganti dengan Client ID kamu
    const redirectUri = window.location.origin;
    const scopes = [
      "user-read-playback-state",
      "user-modify-playback-state",
      "streaming",
      "user-read-private",
      "user-read-email",
    ];

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes.join(" "))}`;

    window.location.href = authUrl;
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>ConnectYourPulse</h1>
      <p>Status: {spotifyConnected ? "Connected to Spotify ✅" : "Not connected ❌"}</p>
      {!spotifyConnected && (
        <button
          onClick={handleSpotifyConnect}
          style={{ padding: "10px 20px", backgroundColor: "#1DB954", color: "#fff", border: "none", borderRadius: 4 }}
        >
          Connect to Spotify
        </button>
      )}
      <div style={{ marginTop: 20 }}>
        <h2>HRV Monitoring</h2>
        <p>Current HRV: {hrv} ms</p>
        {fatigueDetected && (
          <p style={{ color: "red", fontWeight: "bold" }}>Fatigue detected! Playing relaxing music 🎵</p>
        )}
      </div>
    </div>
  );
}
