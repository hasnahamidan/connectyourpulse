import { useState, useEffect } from 'react';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [hrv, setHrv] = useState(null);

  const handleConnect = () => {
    // Simulasi koneksi ke Spotify
    setConnected(true);
  };

  useEffect(() => {
    if (connected) {
      const interval = setInterval(() => {
        // Simulasi update HRV
        setHrv(Math.floor(Math.random() * 50) + 40);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [connected]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-green-700 text-center">ConnectYourPulse</h1>
        <div className="text-center">
          <p className="text-lg">
            Status:{' '}
            <span className={connected ? 'text-green-600' : 'text-red-500'}>
              {connected ? 'Connected' : 'Not connected'}
            </span>{' '}
            {connected ? '✅' : '❌'}
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={handleConnect}
            disabled={connected}
            className="px-6 py-2 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            Connect to Spotify
          </button>
        </div>
        <div className="text-center space-y-2 pt-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-green-700">HRV Monitoring</h2>
          <p className="text-lg">
            Current HRV:{' '}
            <span className="font-mono text-green-800">
              {hrv ? `${hrv} ms` : '--'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
