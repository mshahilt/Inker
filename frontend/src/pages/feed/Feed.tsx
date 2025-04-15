import Feeds from "@/components/user/feeds/Feed"
import { useBlogStore } from "@/store/blogStore"
import { FC, useEffect } from "react"

const Feed : FC = () => {
  const {setAuthorId} = useBlogStore()

  useEffect(() => {
    setAuthorId('')
  }, [setAuthorId])

  return (
      <Feeds/>    
  )
}

export default Feed
