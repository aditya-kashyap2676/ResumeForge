import jwt from "jsonwebtoken"
import {user} from "../Models/User.js"
//Middleware to Protect Routes
const protect = async(req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(token && token.startswith("Bearer")){
            token = token.split(" ")[1]     //Extract Token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user =  await User.findById(decoded.id).select("-password")
            next()
        }else{
            res.status(401).json({message: "Not authorized, no token"})
        }
    }catch(error){
        res.status(401).json({message: "token Failed",error: error.message})
    }
}
export default protect