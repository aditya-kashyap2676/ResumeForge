import fs from "fs"
import path, { basename } from "path"
import Resume from "../Models/Resume.js"
import upload from "../Middlewares/uploadMiddleware.js"
const uploadResumeImages = async (req,res)=>{
    try {
        upload.fields([{name:'thumbnails'},{name:'profileImage'}])(req,res,async (err)=>{
            if(err){
                return res.status(400).json({message:"File Upload Failed",error:err.message})
            }
            const resumeId = req.params.id
            const resume = await Resume.findOne({_id: resumeId, userId: req.user._id})
            if(!resume){
                return res.status(404).json({message:"Resume not found or unauthorized"})
            }
            const uploadsFolder = path.join(__dirname,'..','uploads')
            const baseUrl = `${req.protocol}://${req.get("host")}`
            const newThumbnail = req.file.thumbnail?.[0]
            const newProfileImage = req.files.ProfileImage?.[0]
            //If a new Thumbnail uploaded, delete old one
            //If (newThumbnail && resume.thumbnailLink)
            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail = path.join(uploadsFolder, path,basename(resume.thumbnailLink))
                    if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail) 
                }
            resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`
            }
            //If new Profile image uploaded, delete old one
            //if (newProfileImage && resume.ProfileInfo?.profilePreviewUrl){
            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl))
                    if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile)
                }
            resume.profileInfo.profilePreviewUrl = `${baseUrl}/iploads/${newProfileImage.filename}`
            }
            await resume.save()
            res.status(200).json({message:"Image uploaded successfully", thumbnailLink: resume.thumbnailLink, profilePreviewUrl: resume.profileInfo.profilePreviewUrl })
        })
    } catch (error) {
        console.error("Error uplaoding images:",error)
        res.status(500).json({message:"Failed to upload images",error:err.message})
    }
}
export default uploadResumeImages