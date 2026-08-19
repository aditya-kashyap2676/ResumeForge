import React, { useRef, useState } from 'react'  
import {LuUser,LuUpload,LuTrash} from "react-icons/lu"  
 
const Profilephotoselecter = ({image,setImage,preview,setPreview}) => {  
    const inpref=useRef(null)  
    const [previewurl,setPreviewurl]=useState(null)  
 
    const handleimagechange=(event)=>{  
        const file = event.target.files[0]  
        if(file) {  
            //Update the image State  
            setImage(file)  
            //Genertae Preview URL from the file  
            const preview = URL.createObjectURL(file)  
            if(setPreview){  
                setPreview(preview)  
            }  
            setPreviewurl(preview)  
        }  
    }  
    const handleremoveimg = ()=>{  
        setImage(null)  
        setPreviewurl(null)  
        if(setPreview){  
            setPreview(null)  
        }  
    }   
    const onchoosefile = ()=>{  
        inpref.current.click()  
    }  
  return (  
    <div className='flex justify-center mb-6'>  
        <input type="file" accept='image/*' ref={inpref}   
        onChange={handleimagechange}  
        className='hidden' />  
        {!image ? (  
            <div className='w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative cursor-pointer'>  
                <LuUser className='text-4xl text-purple-500'/>  
                <button type='button' className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' onClick={onchoosefile}>  
                    <LuUpload />  
                </button>  
            </div>  
        ) : (  
            <div className="relative">  
                <img src={preview || previewurl} alt="Profile Photo" className="w-20 h-20 rounded-full object-cover"/>  
                <button type="button" className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' onClick={handleremoveimg}>  
                    <LuTrash/>  
                </button>
            </div>  
        )}  
    </div>  
  )  
}  
  
export default Profilephotoselecter