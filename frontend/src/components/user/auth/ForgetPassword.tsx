import Button from '@/components/ui/button'
import { CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle } from '@/components/ui/credenza'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { forgetPasswordSchema } from '@/schemas/authSchema'
import { AuthService } from '@/services/authServices'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const ForgetPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof forgetPasswordSchema>>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
        try {
            setIsLoading(true)
            const response = await AuthService.forgetPasswordService(data)
            toast.success(response.message)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <CredenzaContent>
            <CredenzaHeader>
                <CredenzaTitle>Forget Password</CredenzaTitle>
                <CredenzaDescription>
                    Fill Out Your Exisiting Email To Sent The Link
                </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
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

                            <CredenzaFooter>
                                <Button disabled={isLoading} type="submit">
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                                <CredenzaClose asChild>
                                    <Button variant='destructive'>Close</Button>
                                </CredenzaClose>
                            </CredenzaFooter>
                        </div>
                    </form>
                </Form>
            </CredenzaBody>

        </CredenzaContent>
    )
}

export default ForgetPassword