import express from "express"
import mongoose from "mongoose"
import cors from "cors" 
import dotenv from "dotenv"

dotenv.config({path: "./.env"})

const app = express();
app.use(express.json());
app.use(cors())


app.listen(3001, () => {
    console.log("App server is ruuning on port 3001");
});

const MongoUri = process.env.DRIVER_LINK
const connectToMongo = async() => {
    try{
        await mongoose.connect(MongoUri)
        console.log("Connected to your MongoDB Database successfully");
    }
    catch(error){
        console.log(error.message);
    }
};

connectToMongo();