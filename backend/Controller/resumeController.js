import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import Resume from "../Models/Resume.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//@desc Create a new Resume
//@route POST/api/resumes
//@access PRIVATE
const createResume = async (req, res) => {
    try {
        const { title } = req.body

        //Default Template
        const defaultResumeData = {
            profileInfo: {
                profilePreviewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },

            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                website: "",
            },

            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],

            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
                },
            ],

            skills: [
                {
                    name: "",
                    progress: 0,
                },
            ],

            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                },
            ],

            certifications: [
                {
                    title: "",
                    issue: "",
                    year: "",
                },
            ],

            languages: [
                {
                    name: "",
                    progress: 0,
                },
            ],

            interests: [""],
        }

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData
        })

        res.status(201).json({
            message: "Resume created successfully",
            resume: newResume
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Create Resume",
            error: error.message
        })
    }
}


//@desc get all resumes for logged-in users
//@route GET/api/resumes
//@access Private
const getUserResume = async (req, res) => {
    try {

        const resumes = await Resume.find({
            userId: req.user._id
        }).sort({
            updatedAt: -1,
        })

        res.json(resumes)

    } catch (error) {

        res.status(500).json({
            message: "Failed to Get Resumes",
            error: error.message
        })

    }
}


//@desc Get single Resume by ID
//@route GET/api/resumes/:id
//@access Private
const getResumeById = async (req, res) => {

    try {

        const resumes = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })

        if (!resumes) {
            return res.status(404).json({
                message: "Resume Not Found"
            })
        }

        res.json(resumes)

    } catch (error) {

        res.status(500).json({
            message: "Failed to Get Resume",
            error: error.message
        })

    }
}


//@desc Update a Resume
//@route PUT/api/resumes/:id
//@access Private
const updateResume = async (req, res) => {

    try {

        const resumes = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })

        if (!resumes) {
            return res.status(404).json({
                message: "Resume Not Found or Unauthorized"
            })
        }

        //Merge updates from req.body into existing resume
        Object.assign(resumes, req.body)

        //Save Updated Resume
        const savedResume = await resumes.save()

        res.status(200).json(savedResume)

    } catch (error) {

        res.status(500).json({
            message: "Failed to Update Resume",
            error: error.message
        })

    }
}


//@desc delete a resume
//@route DELETE/api/resumes/:id
//@access Private
const deleteResume = async (req, res) => {
    try {
        const resumes = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        })
        if (!resumes) {
            return res.status(404).json({
                message: "Resume not Found or Unauthorized"
            })
        }
       //Delete ThumbnailLink and profilePreviewUrl images from uploads folder
        const uploadFolder = path.join(__dirname, "..", "uploads")
        if (resumes.thumbnailLink) {
            const oldThumbnail = path.join(
                uploadFolder,
                path.basename(resumes.thumbnailLink)
            )
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail)
            }
        }
        if (resumes.profileInfo?.profilePreviewUrl) {
            const oldProfileImage = path.join(
                uploadFolder,
                path.basename(resumes.profileInfo.profilePreviewUrl)
            )
            if (fs.existsSync(oldProfileImage)) {
                fs.unlinkSync(oldProfileImage)
            }
        }
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        })
        if (!deleted) {
            return res.status(404).json({
                message: "Resume not found or unauthorized"
            })
        }
        res.json({
            message: "Resume deleted Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Delete Resume",
            error: error.message
        })
    }
}
export {createResume, getUserResume, getResumeById, updateResume, deleteResume}