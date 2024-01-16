import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function AdminProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  let adminDetails = localStorage.getItem("admin");
  
  if (adminDetails) {
    const admin = JSON.parse(adminDetails)?.access || false;
    return admin ? <>{children}</> : <Navigate to="/auth/admin/signin" />;
  } 
  
  return <Navigate to="/auth/admin/signin" />;
}

export default AdminProtectedRoute;
