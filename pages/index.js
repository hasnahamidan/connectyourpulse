import { useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);

  // Ambil token dari URL setelah login Spotify
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        setSpotifyConnected(true);
        window.history.pushState("", document.title, window.location.pathname); // hapus token dari URL
      }
    }
  }, []);

  // Ambil info user Spotify setelah konek
  useEffect(() => {
    if (!accessToken) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("User info:", data));
  }, [accessToken]);

  const clientId = "76776b067d794946aff978a99f961533"; // ← ganti ini
  const redirectUri = "https://connectyourpulseid.vercel.app"; // ← ganti ini kalau pakai Vercel
  const scopes = "user-read-email user-read-private";

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Connect Your Pulse</h1>
      {!spotifyConnected ? (
        <a href={authUrl}>
          <button>Connect to Spotify</button>
        </a>
      ) : (
        <p>Spotify connected!</p>
      )}
    </div>
  );
}
