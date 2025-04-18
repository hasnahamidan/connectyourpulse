const clientId = "76776b067d794946aff978a99f961533";
const redirectUri = "https://connectyourpulseid.vercel.app";
const scope = "user-read-private user-read-email";

const hash = window.location.hash;
if (hash) {
  const token = new URLSearchParams(hash.substring(1)).get("access_token");
  if (token) {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("userData").innerHTML = `
          <p>✅ Connected to Spotify</p>
          <p><strong>Name:</strong> ${data.display_name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
        `;
      });
  }
}

document.getElementById("connectBtn").addEventListener("click", () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  window.location.href = authUrl;
});
