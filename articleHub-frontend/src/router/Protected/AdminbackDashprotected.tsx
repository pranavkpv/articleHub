import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate } from 'react-router-dom';
import type { tokenExist } from '../../interfaces/user';


type ProtectedRouteProps = {
  children: React.ReactNode;
};


const AdminbackDashprotected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('token');
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  const decoded = jwtDecode<tokenExist>(accessToken);
  if (decoded.role != "admin") {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;

};

export default AdminbackDashprotected;
