import mongoose  from "mongoose";
const Mongo_URL='mongodb://localhost:27017'

const mongoConnect= async ()=>{
    try
    {
        await mongoose.connect(Mongo_URL)
        console.log("mongoDb connected successfully")
    }
    catch (error) {
        console.log("mongodb connection failed", error);
    }

    
}
export default mongoConnect;