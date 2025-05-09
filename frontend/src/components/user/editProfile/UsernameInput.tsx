import { FC, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from '@/store/authStore'
import { ProfileService } from '@/services/profileService'


const UsernameInput: FC = () => {
  const { user } = useAuthStore()
  const [ username, setUsername] = useState('')

  useEffect(() => {
    if(user?.username) {
      setUsername(user?.username)
    } 
  },[user])

  const changeUsernameHandler = async () => {
    await ProfileService.changeUsernameService({ username: username.toLowerCase() });
  };

  return (
    <div className="grid w-full  items-center gap-1.5 my-10 relative">
      <Label className='absolute right-3 top-0 font-medium active:scale-95 cursor-pointer'
      onClick={changeUsernameHandler}>change</Label>
      <Label htmlFor="username" >Username</Label>
      <Input type="username" id="username" placeholder="Username" value={username} 
      onChange={(e) => setUsername(e.target.value)}/>
      <p className="text-gray-500 text-xs">This is your display name. It can be your real name or a pseudonym.you can only change this once every 30 days</p>
    </div>
  )
}

export default UsernameInput