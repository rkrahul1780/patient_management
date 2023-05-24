import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const Role = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : '';
  if (!Role) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
