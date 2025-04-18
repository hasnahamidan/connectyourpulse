const clientId = "76776b067d794946aff978a99f961533";
const redirectUri = "https://connectyourpulseid.vercel.app";
const scope = "user-read-private user-read-email";

function handleConnectSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
  window.location.href = authUrl;
}

function extractAccessToken() {
  const hash = window.location.hash;
  if (hash) {
    const token = new URLSearchParams(hash.substring(1)).get("access_token");
    if (token) {
      document.getElementById("spotify-status").textContent = "✅ Connected to Spotify";
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          document.getElementById("spotify-user").textContent = `Name: ${data.display_name}, Email: ${data.email}`;
        })
        .catch((err) => console.error("Failed to fetch user data:", err));
    }
  }
}

window.onload = extractAccessToken;
