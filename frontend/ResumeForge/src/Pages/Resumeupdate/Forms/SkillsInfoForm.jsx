import React from 'react'
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from '../../../components/ResumeSections/ratingInput';
const SkillsInfoForm = ({ skillsInfo, updateArrayItems, addArrayItem, removeArrayItem }) => {
    return (
        <div className='px-5 pt-3'>
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            <div className="mt-4 flex flex-col gap-4 mb-3">
                {skillsInfo.map((skill, index) => (
                    <div className="border  border-gray-200/80 p-4 rounded-lg relative" key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Skill Name" placeholder="JavaScript" type="text" value={skill.name || ""}
                                onChange={({ target }) => { updateArrayItems(index, "name", target.value) }} />
                            <div className="flex flex-col">
                                <label className="text-[13px] text-slate-800 mb-1">Proficiency ({skill.progress / 20 || 0}/5)</label>
                                <RatingInput value={skill.progress || 0} total={5} onChange={(newValue) => { updateArrayItems(index, "progress", newValue) }} />
                            </div>
                        </div>
                        {skillsInfo.length > 1 && (
                            <button className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer' type='button' onClick={() => { removeArrayItem(index) }}><LuTrash2 /></button>
                        )}
                    </div>
                ))}
                <button className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer' type="button" onClick={() => { addArrayItem({ name: "", progress: 0 }) }}><LuPlus />Add Skills</button>
            </div>
        </div>
    )
}

export default SkillsInfoForm