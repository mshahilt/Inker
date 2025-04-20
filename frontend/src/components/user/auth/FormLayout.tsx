import { UserAuthForm } from "@/components/user/auth/user-auth-form";
import { useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { useIsTab } from "@/hooks/useTab";
import { useNavigate } from "react-router-dom";
import LightLogo from "@/assets/inker_main.svg";

// Interface for Props
interface PropsType {
    isSwap: boolean;
    setSwap: (isSwap: boolean) => void;
}

// Form layout component
export const FormLayout = ({ isSwap, setSwap }: PropsType) => {
    // Auth states
    const [authState, setAuthState] = useState<"login" | "register" | "">("");
    const [delayedAuthState, setDelayedAuthState] = useState<
        "login" | "register" | ""
    >("");

    useLayoutEffect(() => {
        setAuthState("login");
        setDelayedAuthState("login");
    }, []);

    // Navigate
    const navigate = useNavigate();

    // isTabSize
    const isTabSize = useIsTab();

    // Css state
    const [cssAnimation, setCssAnimation] = useState<string>("");

    // Update auth state initially
    useLayoutEffect(() => {
        setAuthState("login");
        setDelayedAuthState("login");
    }, []);

    // Delayed auth state
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedAuthState(authState);
        }, 220);

        return () => clearTimeout(timeout); // cleanup
    }, [authState]);

    // Swap
    useEffect(() => {
        setSwap(authState === "register");

        // Apply animation
        setCssAnimation("transition-all duration-500 ease-in-out");

        // Remove animation after swaping (note: no need of animation when isTabSize changes)
        setTimeout(() => {
            setCssAnimation("");
        }, 500);
    }, [authState, setSwap, setCssAnimation]);

    return (
        <div
            className={cn(
                "h-full relative flex items-center lg:p-8",
                cssAnimation,
                isSwap
                    ? isTabSize
                        ? "translate-x-0"
                        : "-translate-x-full"
                    : "translate-x-0"
            )}
        >
            {isTabSize && (
                <img
                    src={LightLogo}
                    className="fixed z-[60] left-5 top-5 w-24 transition-opacity duration-300"
                    alt="Inker"
                    onClick={() => navigate("/")}
                />
            )}

            <div className="mx-auto flex w-full flex-col justify-center space-y-2 px-5 sm:px-0 sm:w-[400px]">
                <div className="flex flex-col space-y-3 text-left mb-10">
                    <h1 className="text-3xl text-center font-medium font-serif tracking-tight transition-all duration-500">
                        {delayedAuthState === "login"
                            ? "Welcome Back!"
                            : "Create an Account"}
                    </h1>
                    <p className="text-sm text-center text-foreground">
                        {delayedAuthState === "login"
                            ? "Please enter your email and password to access your account."
                            : "Please fill in the details to create your account."}
                    </p>
                </div>
                <UserAuthForm
                    delayedAuthState={delayedAuthState as "login" | "register"}
                />
                {/* <div className="relative mt-3">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
            </div>

            {/* Link */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                    {delayedAuthState === "login" ? (
                        <span className="space-y-2 text-nowrap">
                            Don't have an account?{" "}
                            <Button
                                className="cursor-pointer px-2"
                                variant="link"
                                onClick={() => setAuthState("register")}
                            >
                                Sign Up
                            </Button>
                        </span>
                    ) : (
                        <p className="text-nowrap">
                            Already have an account?{" "}
                            <Button
                                className="cursor-pointer px-2"
                                variant="link"
                                onClick={() => setAuthState("login")}
                            >
                                Sign In
                            </Button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
