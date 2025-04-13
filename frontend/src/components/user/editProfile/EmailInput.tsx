import { FC, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from '@/store/authStore'

const EmailInput:FC= () => {
   const { user } = useAuthStore()
    const [ email, setEmail] = useState('')
    useEffect(() => {
      if (user?.email) {
        setEmail(user?.email)
      } 
    },[user])
  return (
    <div className="grid w-full items-center gap-1.5 my-10 relative">
      {/* <Label className='absolute right-3 top-0 font-medium'>change</Label> */}

      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" value={email} />
    </div>
  )
}

export default EmailInput