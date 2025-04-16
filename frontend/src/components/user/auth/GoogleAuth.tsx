import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import useAuthStore from "@/store/authStore.ts";
import { useNavigate } from "react-router-dom";
import googleIcon from "@/assets/google-icon.svg";

const GoogleAuth: React.FC = () => {
    const navigate = useNavigate();
    const { googleAuthLogin } = useAuthStore();

    const googleLogin = useGoogleLogin({
        onSuccess: async (res) => {
            await googleAuthLogin(res.access_token);
            navigate("/feed");
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    return (
        <Button
            type="button"
            className="bg-white dark:bg-gray-300/5 text-black cursor-pointer
            dark:text-white border hover:bg-muted-foreground/10 hover:dark:bg-muted-foreground/15"
            onClick={() => googleLogin()}
            onError={() => toast.error("Google login failed")}
        >
            <img className="w-4 h-4" src={googleIcon} alt="googl icon" />
            Sign In with Google
        </Button>
    );
};

export default GoogleAuth;
