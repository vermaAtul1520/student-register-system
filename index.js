const express=require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const studentRouter=require('./routers/students')

const app=express()
const port=process.env.port

app.use(express.json())
app.use(userRouter)
app.use(studentRouter)

app.get('/',(req,res)=>{
    res.send('testing')
})

app.get("/", (req, res) => {
    res.send({ msg: "Hey congratulations, we are connected" });
});

app.listen(port,()=>{
    console.log('Server is on port '+port)
})