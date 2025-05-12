import {Navigate} from "react-router-dom";
import useAuthStore from "@/store/authStore.ts";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isAuthenticated} = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;