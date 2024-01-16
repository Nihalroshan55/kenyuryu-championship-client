import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  let userDetails = localStorage.getItem("user");
  
  if (userDetails) {
    const user = JSON.parse(userDetails)?.access || false;
    return user ? <>{children}</> : <Navigate to="/auth/signin" />;
  } 
  
  return <Navigate to="/auth/signin" />;
}

export default ProtectedRoute;
