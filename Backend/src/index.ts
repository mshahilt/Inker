import express from "express"
import cors from "cors"
import { Request, Response } from "express"
import mongoose from "mongoose"
const PORT = 3000
const app = express()
app.use(cors())

/*
    @muhammedsirajudeen
    For showing how to connect to db
*/

async function connectDb(){
    try {
        /*
            @muhammedsirajudeen
            TODO:
            Move to a lib or helper folder ensure this URL scheme is used

        */
        await mongoose.connect('mongodb://admin:password@mongo:27017/inker?authSource=admin');
        console.log('Connected to mongodb 🚀')
    } catch (error) {
        console.log(error)
        console.log()
    }
}
connectDb()

app.get('/',(req:Request,res:Response)=>{
    /*
        @muhammedsirajudeen
        return statements must be void simple source of error avoid it.
    */


    res.status(200).json({message:"success"})
    return 
})  

app.listen(PORT, () => console.log(`Server started at ${PORT} ✅`))
