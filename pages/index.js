import { useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [userData, setUserData] = useState(null);

  const clientId = "76776b067d794946aff978a99f961533";
  const redirectUri = "https://connectyourpulseid.vercel.app";
  const scope = "user-read-private user-read-email";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        setAccessToken(token);
        setSpotifyConnected(true);
        window.history.pushState("", document.title, window.location.pathname);
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
        .then((res) => res.json())
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
    <div
      style={{
        fontFamily: "sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "1rem",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          padding: "2rem",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#1DB954" }}>
          Connect Your Pulse
        </h1>
        {!spotifyConnected ? (
          <button
            onClick={handleConnectSpotify}
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              backgroundColor: "#1DB954",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Connect to Spotify
          </button>
        ) : (
          <div>
            <p style={{ color: "#333", fontWeight: "bold" }}>✅ Connected to Spotify</p>
            {userData && (
              <div style={{ marginTop: "1rem", textAlign: "left" }}>
                <p><strong>Name:</strong> {userData.display_name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
