import mongoose from 'mongoose'
import {env} from './env.config'

export async function connectDb() {

    const MONGO_URI = env.MONGO_URI as string

    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to mongodb 🚀')
    } catch (error) {
        console.log('Mongo Error, ', error)
    }
}

