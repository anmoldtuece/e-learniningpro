import React from 'react';

const InputUpload = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-[#0D286F] ml-2 font-semibold text-sm">{label}</label>
      <div className="mt-2 relative">
        <input
          type="file"
          accept="image/jpeg, image/png, application/pdf"
          className="absolute inset-0 z-50 opacity-0 cursor-pointer"
          onChange={onChange}
        />

        <div className="relative z-0 flex items-center justify-between w-80 py-3 px-4 border-2 border-[#0D286F] bg-white text-black rounded-md cursor-pointer">
          <span className="truncate w-52">
            {value ? value.name : placeholder}
          </span>
          <span className="bg-[#0D286F] text-white px-3 py-1 rounded text-sm">
            Choose File
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputUpload;
