import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import Resume from "../Models/Resume.js"
import upload from "../Middlewares/uploadMiddleware.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadResumeImages = (req,res)=>{
    upload.fields([
        {name:"thumbnails",maxCount:1},
        {name:"profileImage",maxCount:1}
    ])(req,res,async (err)=>{
        if(err){
            return res.status(400).json({
                message:"File Upload Failed",
                error:err.message
            })
        }
        try{
            const resume = await Resume.findOne({
                _id:req.params.id,
                userId:req.user._id
            })
            if(!resume){
                return res.status(404).json({
                    message:"Resume not found or unauthorized"
                })
            }

            const uploadsFolder = path.join(__dirname,"..","uploads")
            const baseUrl = `${req.protocol}://${req.get("host")}`
            const newThumbnail = req.files?.thumbnails?.[0]
            const newProfileImage = req.files?.profileImage?.[0]

            if(!newThumbnail && !newProfileImage){
                return res.status(400).json({
                    message:"No image received"
                })
            }

            const oldThumbnailUrl = resume.thumbnailLink
            const oldProfileUrl = resume.profileInfo?.profilePreviewUrl

            if(newThumbnail){
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`
            }
            if(newProfileImage){
                if(!resume.profileInfo) resume.profileInfo = {}
                resume.profileInfo.profilePreviewUrl =
                    `${baseUrl}/uploads/${newProfileImage.filename}`
            }

            await resume.save()

            const removeOldImage = (url)=>{
                if(!url) return
                try{
                    const oldFile = path.join(
                        uploadsFolder,
                        path.basename(url)
                    )
                    if(fs.existsSync(oldFile)) fs.unlinkSync(oldFile)
                }catch(error){
                    console.error("Error deleting old image:",error)
                }
            }

            if(newThumbnail) removeOldImage(oldThumbnailUrl)
            if(newProfileImage) removeOldImage(oldProfileUrl)

            return res.status(200).json({
                message:"Image uploaded successfully",
                thumbnailLink:resume.thumbnailLink,
                profilePreviewUrl:resume.profileInfo?.profilePreviewUrl
            })
        }catch(error){
            console.error("Error uploading images:",error)
            return res.status(500).json({
                message:"Failed to upload images",
                error:error.message
            })
        }
    })
}

export default uploadResumeImages