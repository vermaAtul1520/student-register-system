const express=require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const studentRouter=require('./routers/students')

const app=express()
const port=process.env.port || 3000

app.use(express.json())
app.use(userRouter)
app.use(studentRouter)

app.get('/',(req,res)=>{
    res.send('testing')
})

app.listen(port,()=>{
    console.log('Server is on port '+port)
})