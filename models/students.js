const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const studentSchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    middle_name:{
        type:String
    },
    last_name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile_no:{
        type:String,
        // required:true
    },
    token:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    city:{
        type:String,
        required:true
    },
    pin:{
        type:Number,
        required:true,
        length:6
    },
    user_name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        // trim:true,
        // validator(value){
        //     if(value.toLowerCase.includes('password')){
        //         throw new error('Password contain "password"')
        //     }
        // }
    }
})

// studentSchema.methods.findByCredentials=async (user_name)=>{
//     console.log("hello")
//     const student=await Students.findOne({user_name,psss})
//     console.log("done")
//     if(!student){
//         throw new Error('Unable to login!')
//     }
//     return student
// }

studentSchema.methods.generateAuthToken = async function (student) {
    try {
        console.log('models')
        const token = jwt.sign({ user_name: student.user_name }, "thisismynewcourse",{expiresIn:"2h"});
        return token;
    } catch (error) {
        console.log(error)
        
    }
    
  };
  
  studentSchema.statics.findByCredentials = async (user_name, password) => {
    const student = await Students.findOne({ user_name });
    
    if (!student) {
      throw new Error("Unable to login");
    }
    const isMatch = await bcrypt.compare(password, student.password);
    
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    
   return student;
  };

// Hash the plain text password before saving
studentSchema.pre("save", async function (next) {
    const student = this;
  
    if (student.isModified("password")) {
      student.password = await bcrypt.hash(student.password, 8);
    }
  
    next();
  });
  
  // Delete user tasks when user is removed
//   userSchema.pre("remove", async function (next) {
//     const student = this;
//     await Task.deleteMany({ owner: user._id });
//     next();
//   });
  

const Students=mongoose.model('Students',studentSchema)

module.exports=Students