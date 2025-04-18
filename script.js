const clientId = "76776b067d794946aff978a99f961533";
const redirectUri = "https://connectyourpulseid.vercel.app";
const scope = "user-read-private user-read-email";

document.getElementById("connectBtn").addEventListener("click", () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
  window.location.href = authUrl;
});
