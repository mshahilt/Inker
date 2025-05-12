import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn"
import { resetPasswordSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "../common/password-input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AuthService } from "@/services/authServices";
import { useSearchParams } from "react-router-dom";

const ResetPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
    });

    async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
        setIsLoading(true);
        const token = searchParams.get("token");
        console.log("Token: ", token);
        if (!token) {
            toast.error("Token is required");
            return;
        }

        try {
            const response = await AuthService.resetPasswordService(data, token)
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success("Password reset successfully");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className={cn("relative h-full")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            <Label className="text-sm" htmlFor="password">
                                                New Password
                                            </Label>
                                            <PasswordInput
                                                id="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            <Label className="text-sm" htmlFor="confirmPassword">
                                                Confirm Password
                                            </Label>
                                            <PasswordInput
                                                id="confirmPassword"
                                                placeholder="confirm password"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-2" disabled={isLoading} type="submit">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ResetPasswordForm