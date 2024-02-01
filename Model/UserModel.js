const mongoose=require('mongoose')
const UserSchema=mongoose.Schema({
    name:{
        type:String

    },
   
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    }
},{
    timestamps:true  
})

const UserModel=mongoose.model('userData',UserSchema)

module.exports=UserModel
