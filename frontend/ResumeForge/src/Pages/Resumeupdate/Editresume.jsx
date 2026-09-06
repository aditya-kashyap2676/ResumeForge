import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import {useReactToPrint} from "react-to-print"
const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",

    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },

    template: {
      theme: "",
      colorPalette: "",
    },

    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
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
        issuer: "",
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
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Validate Inputs
  const validateAndNext=(e)=>{}
  //function to navigate to the next page 
  const goToNextStep =()=>{}
  //function go to navigate to the previous page
  const goBack=()=>{}
  const renderforn=()=>{}
  //update simple object (like profileInfo , contactInfo , etc.)
  const updateSection=(section,key,value)=>{}
  //Update array items (like workExperience[0], skills[1], etc.)
  const updateArrayItems=(section,index,key,value)=>{}
  //Add items to array
  const addArrayItem=(section,newItem)=>{}
  //Remove Item from an Array
  const removeArrayItem=(section,index)=>{}
  //fetch Resume By ID
  const FetchResumeById= async ()=>{}
  //update Thumbnail and resume profile Img
  const uploadResumeImages= async ()=>{}
  const updateResumeDetails= async (thumbnailLink,profilePreviewUrl)=>{}
  //Delete Resume
  const handleDeleteResume=()=>{}
  //Download Resume
  const reactToPrintfn=()=>useReactToPrint({contentRef: resumeDownloadRef})
  //function to update base width
  const updateBaseWidth=()=>{}
  useEffect(()=>{
    updateBaseWidth()
    window.addEventListener("resize",updateBaseWidth)
    if(resumeId){
      FetchResumeById()
    }
    return()=>{
      window.removeEventListener("resize",updateBaseWidth)
    }
  },[])
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border-purple-100 py-3 px-4 mb-4">
          <TitleInput
          title={resumeData.title}
          setTitle={(value)=>{
            setResumeData((prevState)=>({
              ...prevState,
              title: value,
            }))
          }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;