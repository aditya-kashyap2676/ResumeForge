import React from 'react'
import Profilephotoselecter from '../../../components/Inputs/Profilephotoselecter'
import Input from "../../../components/Inputs/Input"
const ProfileInfoForm = ({profileData,updateSection,onNext}) => {
  return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
        <div className="mt-4">
            <Profilephotoselecter image={profileData?.profileImg || profileData?.profilePreviewUrl}
            setImage={(value)=>{updateSection("profileImg",value)}}
            preview={(value)=>{updateSection("profilePreviewUrl",value)}}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input value={profileData?.fullName || ""}
                onChange={({target})=>{updateSection("fullName",target.value)}}
                label="Full Name"
                type="text"/>
                 <Input value={profileData?.designation || ""}
                onChange={({target})=>{updateSection("designation",target.value)}}
                label="Designation"
                placeholder="Software Developer"
                type="text"/>
                <div className="col-span-2 mt-3">
                    <label className="block text-xs font-medium text-slate-600 mb-2">Summary</label>
                    <textarea placeholder='Short Introduction'
                    className='w-full px-3 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-md outline-none focus:border-purple-500 resize-none'
                    rows={4}
                    value={profileData?.summary || ""}
                    onChange={({target})=>{updateSection("summary",target.value)}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfoForm