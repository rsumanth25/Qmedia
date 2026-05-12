import { Navigate } from 'react-router-dom';
import { useAuth }  from '../context/AuthContext';

// Wraps any page that requires login.
// If not logged in → redirect to /login
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0f1a', display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: '#00d4b4', fontSize: 18 }}>
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
