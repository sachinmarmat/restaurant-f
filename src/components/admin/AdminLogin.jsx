import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(password);
      showToast('Welcome back, admin!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink via-primary/80 to-ink px-5 py-20">
      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-accent text-3xl">✦</span>
          <h1 className="font-display text-3xl font-bold mt-2">Staff Login</h1>
          <p className="text-muted text-sm mt-2">Restaurant management is private. Enter admin password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Login to Manage'}
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          <Link to="/" className="text-primary hover:underline">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}
