import { Navigate, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../config/routes';
import { hasAuthToken } from '../../utils/authSession';

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // Redirect guests to login while preserving where they tried to go.
  if (!hasAuthToken()) {
    return (
      <Navigate
        replace
        to={APP_ROUTES.login}
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
