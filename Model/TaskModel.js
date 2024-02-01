const mongoose=require('mongoose')

const UserTaskSchema=mongoose.Schema({
    task:{
        type:String
    },
    userId:{
        type:String
    },

    date:{
        type:Date
    },
    
},{timestamps:true})

const TaskModel=mongoose.model('userTaskData',UserTaskSchema)
module.exports=TaskModel