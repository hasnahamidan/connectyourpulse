import { useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [userData, setUserData] = useState(null);

  const clientId = "YOUR_SPOTIFY_CLIENT_ID"; // Ganti dengan client ID Spotify kamu
  const redirectUri = "http://localhost:3000"; // atau ganti ke URL vercel kamu jika sudah di-deploy
  const scope = "user-read-private user-read-email";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        setAccessToken(token);
        setSpotifyConnected(true);
        window.history.pushState("", document.title, window.location.pathname); // hapus hash dari URL
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Gagal mengambil data pengguna Spotify");
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.error(err);
          setSpotifyConnected(false);
        });
    }
  }, [accessToken]);

  const handleConnectSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Connect Your Pulse</h1>
      {!spotifyConnected ? (
        <button
          onClick={handleConnectSpotify}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: "#1DB954",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Connect to Spotify
        </button>
      ) : (
        <div>
          <p>✅ Connected to Spotify</p>
          {userData && (
            <div style={{ marginTop: "1rem" }}>
              <p><strong>Name:</strong> {userData.display_name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
