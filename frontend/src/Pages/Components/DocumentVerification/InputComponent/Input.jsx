import React from 'react'

const Input = ({label ,placeholder,value,onChange, readonly}) => {
  return (
    <div className='flex flex-col'>
      <label className='text-[#0D286F] ml-7 font-bold'>{label}</label>
      <input
        type="text"
        name="inputField"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
        className="focus:border-blue-800 outline-none placeholder:text-gray-700 mt-3 py-3 px-7 border-2 text-[#0D286F] bg-transparent rounded-md w-80 font-semibold"
      />
    </div>
  )
}

export default Input
