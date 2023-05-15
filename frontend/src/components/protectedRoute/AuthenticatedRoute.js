// AuthenticatedRoute.js
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

// const AuthenticatedRoute = ({ component: Component, ...rest }) => {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const loading = useSelector((state) => state.loading);
//   const { loading: loadingState } = loading;

//   console.log('Route ==> ', Component, ...rest);

//   return userInfo ? (
//     <Route {...rest} element={<Component />} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default AuthenticatedRoute;

// export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const loading = useSelector((state) => state.loading);
//   const { loading: loadingState } = loading;

//   console.log('Route ==> ', Component, ...rest);

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return userInfo ? <Component {...props} /> : <Navigate to="/login" />;
//       }}
//     />
//   );
// };

// export const withProtectedRoute = (Component) => () => {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const loading = useSelector((state) => state.loading);
//   const { loading: loadingState } = loading;

//   const isLoggedIn = true; // replace with your own auth logic
//   return userInfo ? <Component /> : <Navigate to="/login" replace />;
// };

// export const withProtectedRoute = (Component) => () => {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const loading = useSelector((state) => state.loading);
//   const { loading: loadingState } = loading;

//   console.log('Component ', Component);

//   if (!userInfo && !loadingState) {
//     return <Navigate to="/login" replace />;
//   }

//   return Component ? <Component /> : <h1>Page Not Found</h1>;

//   // return userInfo ? <Component /> : <Navigate to="/login" replace />;
// };

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const loading = useSelector((state) => state.loading);
  const { loading: loadingState } = loading;

  // console.log('Component ', Component, ...rest);

  return (
    <Routes>
      <Route
        {...rest}
        render={({ location }) =>
          userInfo ? (
            <Component />
          ) : (
            <Navigate to={{ pathname: '/login', state: { from: location } }} />
          )
        }
      />
    </Routes>
  );
};

export const withProtectedRoute = (Component) => (props) => {
  return <ProtectedRoute component={Component} {...props} />;
};
