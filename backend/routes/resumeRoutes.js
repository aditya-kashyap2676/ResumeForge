import e from "express";
import {createResume, getUserResume, getResumeById, updateResume, deleteResume} from "../Controller/resumeController.js"
import protect from "../Middlewares/authMiddleware.js"
// import {uploadResumeImages} from "../Controller/uploadimages.js"
const router = e.Router()
router.post("/",protect, createResume)   //Create Resume
router.get("/",protect, getUserResume)   //Get Resume
router.get("/:id",protect, getResumeById)   //Get Resume By Id
router.put("/:id",protect, updateResume)   //Update Resume
// router.put("/:id/upload-images",protect,uploadResumeImages)
router.delete("/:id",protect,deleteResume)  //Delete Resume
export default router
