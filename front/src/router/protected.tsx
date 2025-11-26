import { Outlet, Navigate } from "@tanstack/react-router"
import { useAuth } from "../hooks/useAuth"

export function ProtectedRoute() {
  const auth = useAuth()

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
