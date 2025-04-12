import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type UnProtectedRouteProps = {
  children: React.ReactNode;
};

const UnProtectedRoute = ({ children }: UnProtectedRouteProps) => {
  const {accessToken, user} = useSelector((state: RootState) => state.auth);

  if (accessToken) {
    return <Navigate to={`/profile/${user?.username}`} replace />;
  }

  return <>{children}</>;
};

export default UnProtectedRoute;