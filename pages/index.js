import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeartPulse, Headphones, AlertCircle } from "lucide-react";

export default function Home() {
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [hrv, setHrv] = useState(45); // dummy HRV value
  const [fatigueDetected, setFatigueDetected] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        setAccessToken(token);
        setSpotifyConnected(true);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-teal-50 flex flex-col items-center justify-center py-10 px-4 text-gray-800">
      <div className="w-full max-w-md space-y-6">
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-6 text-center space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <HeartPulse className="h-10 w-10 text-teal-600" />
              <h1 className="text-2xl font-bold text-teal-700">ConnectYourPulse</h1>
              <p className="text-sm text-gray-500">Stay focused & relaxed during activity</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Status: {spotifyConnected ? "Connected ✅" : "Not connected ❌"}
              </p>
              {!spotifyConnected && (
                <a
                  href="https://accounts.spotify.com/authorize?client_id=YOUR_SPOTIFY_CLIENT_ID&response_type=token&redirect_uri=https://connectyourpulse.vercel.app&scope=user-read-private"
                  className="inline-block w-full"
                >
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    Connect to Spotify
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Heart Rate</p>
                <p className="text-xl font-bold text-red-600">59 bpm</p>
              </div>
              <div>
                <p className
