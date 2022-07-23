import mongoose from "mongoose";
import config from "./config";

const conn = async ()=>{

  try {

   await mongoose
  .connect(config.MONGODB_URI)
  .then((db) => console.log(`DB is connected`))
  
    
  } catch (error) {
    console.log(error)
  }
}


module.exports={conn}
