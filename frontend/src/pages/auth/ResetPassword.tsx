import { Card } from "@/components/ui/card"
import { useTheme } from "@/components/user/common/theme-provider"
import LightLogo from "@/assets/inker_main.svg"
import DarkLogo from "@/assets/inker_main_dark.svg"
import ResetPasswordForm from "@/components/user/auth/ResetPasswordForm"

const ResetPassword = () => {
    const { theme } = useTheme()
    return (
        <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
                <div className='mb-4 flex items-center justify-center'>
                    <img src={theme == 'light' ? LightLogo : DarkLogo} />
                </div>
                <Card className='p-6'>
                    <div className='flex flex-col space-y-4'>
                        <h1 className='text-2xl font-bold'>Reset Password</h1>
                        <p className='text-sm text-muted-foreground'>Please enter your new password.</p>
                        <ResetPasswordForm />
                    </div>
                </Card>
            </div>
        </div>

    )
}

export default ResetPassword