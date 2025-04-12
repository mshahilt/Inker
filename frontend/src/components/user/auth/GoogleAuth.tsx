import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";
import useAuthStore from "@/store/authStore.ts";
import {useNavigate} from "react-router-dom";

const GoogleAuth: React.FC = () => {

    const navigate = useNavigate();
    const {googleAuthLogin} = useAuthStore();

    const googleLogin = useGoogleLogin({
        onSuccess: async (res) => {
            await googleAuthLogin(res.access_token)
            navigate('/feed')
        },
        onError: error => console.log('Login Failed:', error),
    });

    return (
        <Button
            onClick={() => googleLogin()}
            onError={() => toast.error("Google login failed")}
        >
            google
        </Button>
    );
};

export default GoogleAuth;
