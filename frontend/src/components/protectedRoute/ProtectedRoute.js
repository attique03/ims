import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  if (!userInfo && !loadingState) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <h1>Page Not Found</h1>;
};

export default ProtectedRoute;
