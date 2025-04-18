const clientId = "76776b067d794946aff978a99f961533"; // Ganti dengan Client ID kamu jika berubah
const redirectUri = "https://connectyourpulseid.vercel.app/";
const scopes = [
  "user-read-private",
  "user-read-email",
];

document.getElementById("connectBtn").addEventListener("click", () => {
  const authUrl = `https://accounts.spotify.com/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=token` +
    `&scope=${encodeURIComponent(scopes.join(" "))}`;
  window.location.href = authUrl;
});

window.addEventListener("load", () => {
  const hash = window.location.hash;
  if (hash) {
    const token = new URLSearchParams(hash.substring(1)).get("access_token");
    if (token) {
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          document.getElementById("userData").innerHTML =
            `<p>Logged in as <strong>${data.display_name}</strong></p>`;
        })
        .catch(error => {
          document.getElementById("userData").textContent = "Failed to fetch user data.";
        });
    }
  }
});
