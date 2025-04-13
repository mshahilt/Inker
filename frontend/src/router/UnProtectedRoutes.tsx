import {Navigate} from "react-router-dom";
import useAuthStore from "@/store/authStore.ts";

type UnProtectedRouteProps = {
    children: React.ReactNode;
};

const UnProtectedRoute = ({children}: UnProtectedRouteProps) => {
    const {isAuthenticated,user} = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to={`/profile/${user?.username}`} replace/>;
    }

    return <>{children}</>;
};

export default UnProtectedRoute;