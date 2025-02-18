import { ChevronLeft, Plus, Settings } from 'lucide-react'
import { FC } from 'react'

const ProfileInfo: FC = () => {
  return (
    <div className='min-w-[300px] lg:w-[400px] p-2 lg:border lg:h-full'>
      <div className="flex justify-between items-center mb-5">
        <div className="flex">
          <ChevronLeft strokeWidth={1.8} />
          <p> Profile</p>
        </div>
        <Settings strokeWidth={1.8} size={19} />
      </div>

      <div className="w-full bg-gray-200 p-1 rounded-3xl mb-3">
        <img className="w-26 h-26 rounded-3xl" src="https://res.cloudinary.com/dwyxogyrk/image/upload/v1737433466/h0xf7zi0blmclfqrjeo7.png" alt="" />
      </div>

      <div className="p-2 flex flex-col gap-3">
        <p className="text-xl font-semibold">Full Name</p>
        <div className="flex gap-2 items-center mt-2">
          <p className="text-sm text-gray-600">@username</p>
          <p className="text-xs text-gray-400">. Joined Febraury 2025</p>
        </div>
        <div className="flex gap-2 text-sm font-light text-gray-400">
          <p><span className="font-semibold text-black">0</span> Posts</p>
          <p><span className="font-semibold text-black">0</span> Views</p>
          <p><span className="font-semibold text-black">0</span> Upvotes</p>
        </div>
      </div>

      <button className="outline rounded-lg px-2 py-1 w-fit h-fit flex gap-2 mt-3 items-center">
        <Plus strokeWidth={1.8} />
        <p className="text-md ">Edit Profile</p>
      </button>
    </div>
  )
}

export default ProfileInfo
