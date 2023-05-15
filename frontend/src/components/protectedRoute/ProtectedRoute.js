import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const params = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  // console.log('Children ', children, params);

  if (!userInfo && !loadingState && params.pathname === '/forgot-password') {
    return <Navigate to="/forgot-password" replace />;
  }

  if (!userInfo && !loadingState) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <h1>Page Not Found</h1>;
};

export default ProtectedRoute;
