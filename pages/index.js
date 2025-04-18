import { useEffect, useState } from "react";

export default function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    if (token) {
      setAccessToken(token);
      setSpotifyConnected(true);
      window.history.pushState({}, "", "/");
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
        });
    }
  }, [accessToken]);

  const handleConnectSpotify = () => {
    const clientId = "76776b067d794946aff978a99f961533";
    const redirectUri = "https://connectyourpulseid.vercel.app/api/callback";
    const scope = "user-read-private user-read-email";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
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
