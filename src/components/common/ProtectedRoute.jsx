import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.token));
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to="/signin" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}
