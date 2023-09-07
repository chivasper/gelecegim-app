import { memo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = memo(({ children }) => {
  const isLoggedIn = useSelector((state) => state.userInformation.isLoggedin);
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/auth/login"
        replace={true}
        state={{
          return_url: location.pathname,
        }}
      />
    );
  }

  return children;
});
export default RequireAuth;
