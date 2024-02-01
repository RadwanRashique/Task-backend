const express=require('express')
const Userrouter=express.Router()
const UserController=require('../Controllers/UserController')
const UserAthenticate= require('../Middleware/UserAuthMiddleware')


Userrouter.post('/register',UserController.RegisterUser)
Userrouter.post('/login',UserController.UserLogin)
Userrouter.get('/userName',UserAthenticate,UserController.GetUserName)
Userrouter.get('/taskData',UserAthenticate,UserController.GetTaskData)
Userrouter.post('/addTask',UserAthenticate,UserController.AddTask)
Userrouter.put('/editTask/:id',UserAthenticate,UserController.EditTask)
Userrouter.delete('/deleteTask/:id',UserAthenticate,UserController.DeleteTask)


module.exports=Userrouter