import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicSite from './pages/PublicSite';
import AdminPage from './pages/AdminPage';
import { useRestaurant } from './context/RestaurantContext';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink text-white">
      <div className="text-center">
        <div className="text-accent text-4xl mb-4 animate-pulse">✦</div>
        <p className="font-display text-2xl">Loading restaurant...</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6">
      <div className="card max-w-md text-center">
        <p className="text-red-800 font-semibold mb-2">Connection Error</p>
        <p className="text-muted mb-4">{message}</p>
        <button onClick={onRetry} className="btn-primary">Retry</button>
      </div>
    </div>
  );
}

export default function App() {
  const { loading, error, fetchRestaurant } = useRestaurant();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={fetchRestaurant} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
