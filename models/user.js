const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validator(value){
            if(value.toLowerCase.includes('password')){
                throw new error('Password contain "password"')
            }
        }
    },
    userType:{
        type:String,
        required:true,
    }
})

userSchema.statics.findByCredentials=async (user_name,password)=>{
    const user=await User.findOne({user_name,password})

    if(!user){
        throw new error('Unable to login!')
    }
    return user._id
}

const User=mongoose.model('User',userSchema)

module.exports=User