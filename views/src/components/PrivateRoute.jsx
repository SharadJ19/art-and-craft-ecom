import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking authentication...</div>; // Simple loading state
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;