import e from "express"
import {registerUser, loginUser, getUserProfile} from "../Controller/authController.js"
import {protect} from "../Middlewares/authMiddleware.js"
const router = e.routes()
//Auth Routes
router.post("/register",registerUser)   //Register user
router.post("/login",loginUser)         //Login user
router.get("/profile",getUserProfile)   //Get user Profile

export default router