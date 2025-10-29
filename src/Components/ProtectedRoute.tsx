import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  if (role === null) {
    return null;
  }

  if (!allowedRoles.map((r) => r.toUpperCase()).includes(role.toUpperCase())) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
