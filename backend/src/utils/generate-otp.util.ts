import crypto from "crypto"
import { START_INTERVAL, END_INTERVAL } from "@/constants"

export const generateOTP = () => {
    return crypto.randomInt(START_INTERVAL, END_INTERVAL).toString()
}