const mongoose = require('mongoose');
const dotenv= require("dotenv")


dotenv.config();

const connectdb= async()=> {
  try {
    await mongoose.connect(process.env.MONGO_DB,);
    console.log("connected");
    
  } catch (error) {
    console.log(error, "something occured");
    
  }

}

module.exports= connectdb