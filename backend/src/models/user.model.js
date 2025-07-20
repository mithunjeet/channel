import mongoose from "mongoose"
import  Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
  
    username: {

        type:String,
        required:true,
        lowercase:true,
        index:true,
        trim : true
        

        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        
        password:{
            
            type:String,
           required:true
        },
        
        avatar:{
            type:String,
            // required:true
        },
        
        coverimage:{
            type:String ,
            // required:false
        },
        service:
        {
            type: String,
            required : true
        },
        
        state: {
           type: String, 
           required  : true
        }, 
        district: {
            type: String, 
             required  : true 
        },
       
        // watchHistory:[{ type:mongoose.Schema.Types.ObjectId, ref: "Video"}],
        
        refreshtoken:{
            type:String
       },
        isverified: {
            type: Boolean , default : false
        },
       otp: {
           type: Number,
      },
    otpExpires: { type: Date },
    stopCall: {
        type: Boolean,
        default: false   
    },
    mobile : {
        type : Number
    },
    gender : {
       type: String,
    }
    

}, { timestamps : true})

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
  
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}


userSchema.methods.generateRefreshToken = function (payload) {
   
    return Jwt.sign(payload
        ,process.env.TokenSecreat,
        
        { expiresIn: process.env.EXPIRY_TOKEN_REFRESH_TOKEN })
}

userSchema.methods.generateAccesToken = function (payload) {
   
    return Jwt.sign( payload, process.env.TokenSecreat,
        
        { expiresIn: process.env.EXPIRY_TOKEN_ACCESS_TOKEN })
}



const User = mongoose.model("User", userSchema )
export {User}
