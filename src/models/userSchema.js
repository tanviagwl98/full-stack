const mongoose =require('mongoose')
const validator = require('validator')
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(val){
           if(!validator.isEmail(val)){
                throw new Error('Enter a valud email address')
           } 
        }
    },
    password:{
        type:String,
        required:true,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error('Enter strong password')
            }
        }
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(val){
            if(!['male', 'female', 'others'].includes(val)){
                throw new Error("Gender is invalid")
            }
        }
    },
    isPremium: {
        type: Boolean,
        default: false,
      },
      membershipType: {
        type: String,
      },
    photoUrl:{
        type:String
    },
    desc:{
        type:String
    },
    skills:{
        type:[String]
    },
},
{
    timestamps:true
}
);

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "DEVTinder$70", {expiresIn: '7d'})
    return token;
}

const User = mongoose.model("User", userSchema)

module.exports = User;

// module.exports = mongoose.model("User", userSchema)