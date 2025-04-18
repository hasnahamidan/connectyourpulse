export default function Home() {
  const clientId = "76776b067d794946aff978a99f961533";
  const redirectUri = "https://connectyourpulseid.vercel.app/api/callback";
  const scope = "user-read-private user-read-email";


  const handleConnectSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&show_dialog=true`;
    window.location.href = authUrl;
  };


  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Connect Your Pulse</h1>
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
    </div>
  );
}
