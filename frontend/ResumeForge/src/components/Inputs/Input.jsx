import React, { useState } from 'react'
const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showpassword, setShowpassword] = useState(false)
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-[13px] text-slate-800'>{label}</label>
            <div className='input-box'>
                <input type={type === "password" ? (showpassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className="w-full bg-gray-100 p-2 rounded-lg"
                    value={value}
                    onChange={(e) => onChange(e)}
                />
           </div>
        </div>
    )
}

export default Input