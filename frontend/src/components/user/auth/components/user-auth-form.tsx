"use client"

import { type FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AuthService } from "@/services/authServices"
import { useNavigate } from "react-router-dom"

interface UserAuthFormProps {
    authState: "login" | "register"
    onStateChange: (state: "login" | "register") => void
}

const loginSchema = z.object({
    email: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(1, {
            message: "Please enter your password",
        })
        .min(7, {
            message: "Password must be at least 7 characters long",
        }),
})

const registerSchema = z
    .object({
        name: z.string().min(1, { message: "Please enter your name" }),
        email: z.string().min(1, { message: "Please enter your email" }).email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(1, {
                message: "Please enter your password",
            })
            .min(7, {
                message: "Password must be at least 7 characters long",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match.",
        path: ["confirmPassword"],
    })

export const UserAuthForm: FC<UserAuthFormProps> = ({ authState, onStateChange }) => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const formSchema = authState === "login" ? loginSchema : registerSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))
            if (authState == 'login') {
                await AuthService.loginService(data)
            } else {
                await AuthService.registerService(data as { email: string; password: string; name: string; confirmPassword: string })
            }
            toast.success(authState === "login" ? "Logged in successfully" : "Account created successfully")
            navigate('/home')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("grid gap-6")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        {authState === "register" && (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <PasswordInput placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {authState === "register" && (
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <PasswordInput placeholder="Confirm Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <Button className="mt-2" disabled={isLoading} type="submit">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {authState === "login" ? "Log In" : "Create Account"}
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="text-center">
                {authState === "login" ? (
                    <p>
                        Don't have an account?{" "}
                        <Button variant="link" onClick={() => onStateChange("register")}>
                            Register
                        </Button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <Button variant="link" onClick={() => onStateChange("login")}>
                            Log In
                        </Button>
                    </p>
                )}
            </div>
        </div>
    )
}

