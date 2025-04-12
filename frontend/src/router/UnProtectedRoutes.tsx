import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type UnProtectedRouteProps = {
  children: React.ReactNode;
};

const UnProtectedRoute = ({ children }: UnProtectedRouteProps) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  if (accessToken) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};

export default UnProtectedRoute;