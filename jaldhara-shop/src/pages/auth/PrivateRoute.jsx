// src/pages/auth/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>; // optional
  if (!user) return <Navigate to="/login" />; // redirect if not logged in

  return children;
}
