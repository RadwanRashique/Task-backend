const UserModel=require('../Model/UserModel')
const UserTaskModel=require('../Model/TaskModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const TaskModel = require('../Model/TaskModel')

const RegisterUser=async(req,res)=>{
   console.log(req.body)
    try{
console.log("ready")
        const {username,email,password,phone}=req.body

      const ExistingEmail= await UserModel.findOne({email:email})
      if(ExistingEmail){
       return res.status(200).json({message:"You Already Have An Account",success:false})
      }

      const SucurePassword= await  bcrypt.hash(password,10)
      console.log(SucurePassword)

      const Data=  new UserModel({
        name:username,
        email,
        password:SucurePassword,
        phone
      })
       await  Data.save()
      return  res.status(201).json({message:"successfully Registerd",success:true})
    }
    catch(error){
        console.error(error,"At RegisterUser")
        res.status(500).json({message:"Internal server Error",success:false})
    }
}

const UserLogin=async(req,res)=>{
    console.log(req.body)
    try{

        const {email,password}=req.body
      
        const Emailcheck= await UserModel.findOne({email:email})
        if(!Emailcheck){
         return    res.status(200).json({message:"user Not found Check The Mail",success:false})
        }

        const passwordVerify= await bcrypt.compare(password,Emailcheck.password)
        if(!passwordVerify){
          return   res.status(200).json({message:"password Incorrect",success:false})
        }
      
     const token=  jwt.sign({UserId:Emailcheck._id},process.env.SECRET,{expiresIn:'1d'})
        return  res.status(200).json({message:"Successfully Loged-In",success:true,token:token})
       
    }
    catch(error){
        console.error(error,"At LoginUser ")
        res.status(500).json({message:"Internal server Error",success:false})
    }
}
// '65b8574a87c251e8e69c9b14'
const GetTaskData=async(req,res)=>{
    try{

        const userId=req.userId
        const TaskData= await TaskModel.find({userId:userId}).sort({createdAt:-1})
        
        res.status(200).json({success:true,TaskData:TaskData})

    }
    catch(error){
        console.error(error,"At GetTaskData")
        res.status(500).json({message:"Internal server Error",success:false})
    }
}

const GetUserName=async(req,res)=>{
   
    try{
        const userId= req.userId
        const Data= await UserModel.findById(userId)
       const username=Data.name
       console.log(username)
      return  res.status(200).json({success:true,userName:username})

    }
    catch(error){
        console.error(error,"At GetUserName")
        res.status(500).json({message:'Internal server Error',success:false})
    }
}

const AddTask=async(req,res)=>{

    try{

const task=req.body.task
const userId=req.userId
 
  

 const TaskData= new TaskModel({
    task,
    userId
 })

   await  TaskData.save()
       res.status(201).json({message:"Task successfully Added",success:true})

    }
    catch(error){
        console.error(error," at AddTask")
        res.status(500).json({message:"Internal server Error",success:false})
    }
    
}

const EditTask=async(req,res)=>{
    try{
        const taskId= req.params.id
       
        const taskdata=req.body.task
       const Data= await TaskModel.findOneAndUpdate({_id:taskId},{$set:{ task:taskdata}});
       console.log(Data)
        res.status(200).json({ message: "Task Successfully Updated", success: true });
      
    }
    catch(error){
        console.error(error,"At EditTask")
        res.status(500).json({message:"Internal server Error",success:false})
    }
}

const  DeleteTask=async(req,res)=>{
    try{
        const taskId= req.params.id
         await TaskModel.findByIdAndDelete(taskId)
      return   res.status(200).json({message:"Successfully deleted",success:true})

    }
    catch(error){
        console.error(error,"At DeleteTask")
        res.status(500).json({message:"Internal server Error",success:false})
    }

}

module.exports={

    RegisterUser,
    UserLogin,
    GetUserName,
    GetTaskData,
    AddTask,
    EditTask,
    DeleteTask



}