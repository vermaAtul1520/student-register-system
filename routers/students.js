const express=require('express')
const Students=require('../models/students')
const auth=require('../middleware/auth')
const router=new express.Router()
const jwt=require('jsonwebtoken')

// router.post('/students',async (req,res)=>{
//     const students=new Students(req.body)
//     try{
//         await students.save()
//         res.send(students)
//     }catch(err){
//         res.status(400).send(err)
//     }
// })

router.post('/students', async (req, res) => {
    const student = new Students(req.body)
    // console.log(student)
    try {
        await student.save()
        const token = await student.generateAuthToken(student)
        student.token=token;
        res.status(201).send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/students',async (req,res)=>{
    try{
        const name=req.query.name;
        if(name){

        }
        const students=await Students.find({})
        res.send(students)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/students/:id',async (req,res)=>{
    const _id=req.params.id
    try{
        const students=await Students.findById(_id)
        if(!students){
            return res.status(404).send()
        }
        res.send(students)
    }catch(err){
        res.status(500).send(err)
    }
})

// router.get('/students/login',async (req,res)=>{
//     try{
//         const students=await Students.findByCredentials(req.body.user_name)
//         res.send(students)
//     }catch(err){
//         res.status(400).send(err)
//     }
// })

router.post('/students/login', async (req, res) => {
    try {

        const student = await Students.findByCredentials(
            req.body.user_name,
            req.body.password
            );
            const token = await student.generateAuthToken(student)
            // console.log("hello")
            // console.log(student)
        student.token=token;
        res.send(student)
    } catch (e) {
        // console.log(e);
        res.status(400).send()
    }
})

router.post('/students/logout', auth, async (req, res) => {
    try {
        req.student.tokens = req.student.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.student.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



module.exports=router