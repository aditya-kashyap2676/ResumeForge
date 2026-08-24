import User, {user} from "../Models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//Generate JWT Tokens 
const generatetoken = (userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expresIn:"7d"}) 
}
//@desc Register a new user
//@route POST /api/auth/register.js
//@access Public
const registerUser = async (req,res)=>{
    try{
        const {name,email,password,profileImageUrl} = req.body;
        //Check if already exists
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }
        //Hash Password
        const salt = await bcrypt.gansalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        //Create new user
        const user = await User.create({name,email,password:hashedPassword,profileImageUrl:user.profileImageUrl,token:generatetoken(user._id)})
    } catch(error){
        res.status(500).json({message:"Server Error",error:error.message})
    }
}
//@desc Login user
//@riute POST/api/auth/login.js
//@access Public
const loginUser = async (req,res)=>{}
//@desc Get user Profile
//@riute POST/api/auth/profile.js
//@access Private (Requires JWT)
const getUserProfile = async (req,res)=>{}
export {registerUser,loginUser,getUserProfile}
