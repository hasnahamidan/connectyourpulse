
import { useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [spotifyConnected, setSpotifyConnected] = useState(false);

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

  const handleSpotifyConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
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
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>ConnectYourPulse</h1>
      <p>Status Spotify: {spotifyConnected ? "Connected ✅" : "Not Connected ❌"}</p>
      {!spotifyConnected && (
        <button onClick={handleSpotifyConnect}>Connect to Spotify</button>
      )}
    </main>
  );
}
