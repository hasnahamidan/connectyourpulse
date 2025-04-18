export default async function handler(req, res) {
  const code = req.query.code;

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = "https://connectyourpulseid.vercel.app/api/callback";

  const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    })
  });

  const data = await response.json();

  if (data.access_token) {
    res.redirect(`/?access_token=${data.access_token}`);
  } else {
    res.status(400).json({ error: "Token exchange failed", details: data });
  }
}
