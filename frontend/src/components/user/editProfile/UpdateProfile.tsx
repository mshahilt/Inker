import { FC } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import KeyValueInput from './KeyValueInput'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const UpdateProfile: FC = () => {
    return (

        <Card className="grid w-full items-center gap-1.5 space-y-2 p-4 shadow-none ">
            <Label htmlFor="email">Full Name</Label>
            <Input type="email" id="email" placeholder="my name" />
            <Label>Bio</Label>
            <Textarea placeholder="Type your message here." />
            <h2 className="text-lg font-semibold">Social Media URLs</h2>
            <p className="text-gray-500 text-sm">Add links to your website, blog, or social media profiles.</p>

            <KeyValueInput />
            <KeyValueInput />

            <Button variant="outline">Add URL</Button>
            <Button className="w-full md:w-auto px-6 py-3 ">
                Update Profile
            </Button>
        </Card>
    )
}

export default UpdateProfile