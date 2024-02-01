const mongoose=require('mongoose')
// const dotenv=require('dotenv')
// dotenv.config()
const mongo_url=process.env.MONGO_URL
const DbConfig = async() =>{
    try{

     await mongoose.connect(mongo_url)
     console.log("Data base successfully connected")
  
    }

    catch(error){
        console.error(error)
        process.exit(1)
    }
}

module.exports=DbConfig