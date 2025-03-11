
import {z} from 'zod'
const editUsernameSchema = z.object({
    username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
})

export default editUsernameSchema;