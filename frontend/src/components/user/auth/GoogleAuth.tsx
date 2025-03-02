import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import { api } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authServices";
import { toast } from "sonner";

interface DecodedUser {
  name: string;
  email: string;
  picture: string;
}

const GoogleAuth: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (response: any) => {
    const decodedUser: DecodedUser = jwtDecode<DecodedUser>(response.credential);
    try {
        await AuthService.googleAuth({email: decodedUser.email, name: decodedUser.name})
        toast.success("Logged in successfully");
        navigate('/home')
    } catch (error: any) {
        toast.error(error.message || "An unexpected error occurred.");
    } 
  };

  return (
    <GoogleLogin
      onSuccess={(response) => handleSubmit(response)}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleAuth;