const express=require('express')
const cors=require('cors')
const app=express()

const mongoose=require('mongoose')

const dotenv=require('dotenv')

dotenv.config()
app.use(cors('*'))
const DbConnection=require('./Config/dbConfig')

DbConnection()

app.use(express.json());


app.use(express.urlencoded({ extended: true }));




const UserRouter=require('./Routes/UserRoute')

app.use('/api/user',UserRouter)


const port=process.env.PORT


app.listen(port,()=>{
    console.log(`The server is running on port ${port}`)
})