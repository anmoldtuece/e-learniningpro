import React, { useState, useEffect } from "react";
import Input from "../DocumentVerification/InputComponent/Input.jsx";
import InputUpload from "../DocumentVerification/Inputupload/InputUpload.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../Images/logo.svg";

const TeacherDocument = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/teacher/TeacherDocument/${Data}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // <-- Add this line
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setData(user.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    Phone: data.Phone || "",
    Address: data.Address || "",
    Experience: data.Experience || "",
    SecondarySchool: data.SecondarySchool || "",
    SecondaryMarks: data.SecondaryMarks || "",
    HigherSchool: data.HigherSchool || "",
    HigherMarks: data.HigherMarks || "",
    UGcollege: data.UGcollege || "",
    UGmarks: data.UGmarks || "",
    PGcollege: data.PGcollege || "",
    PGmarks: data.PGmarks || "",
    Aadhaar: null,
    Secondary: null,
    Higher: null,
    UG: null,
    PG: null,
  });

  const handleFileChange = (fileType, e) => {
    setFormData({
      ...formData,
      [fileType]: e.target.files[0],
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/teacher/verification/${Data}`,
        {
          method: "POST",
          body: formDataObj,
          credentials: "include", // <-- Add this line
        }
      );
      const responseData = await response.json();
      setLoader(false);
      if (!response.ok) {
        setError(responseData.message);
      } else {
        navigate("/pending");
      }
    } catch (e) {
      console.error("Error:", e);
      setLoader(false);
    }
  };

  return (
  <>
    {loader && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex flex-col justify-center items-center">
        <RotatingLines
          visible={true}
          height="100"
          width="100"
          color="#0D286F"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
        <span className="text-white text-xl mt-4">Uploading ...</span>
      </div>
    )}

    {/* Header */}
    <div className="flex items-center justify-between px-10 py-4 bg-[#0D286F]">
      <div className="flex items-center gap-3">
        <img src={logo} className="w-14" alt=" Logo" />
        <h1 className="text-2xl text-[#4E84C1] font-bold"> Gurukul</h1>
      </div>
      <h2 className="text-white text-xl font-medium">Document Verification (Teacher)</h2>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="px-10 py-8">
      {/* Section: Personal Info */}
      <div>
        <h3 className="text-[#0D286F] text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="First Name" value={data.Firstname} readonly />
          <Input label="Last Name" value={data.Lastname} readonly />
          <Input label="Phone No." value={formData.Phone} onChange={(e) => handleInputChange("Phone", e.target.value)} />
          <Input label="Home Address" value={formData.Address} onChange={(e) => handleInputChange("Address", e.target.value)} />
          <Input label="Experience (years)" value={formData.Experience} onChange={(e) => handleInputChange("Experience", e.target.value)} />
          <InputUpload label="Upload Aadhaar Card" onChange={(e) => handleFileChange("Aadhaar", e)} />
        </div>
      </div>

      {/* Section: Educational Info */}
      <div className="mt-10">
        <h3 className="text-[#0D286F] text-lg font-semibold mb-4">Educational Information</h3>

        {/* Secondary */}
        <div className="bg-[#f5faff] border p-6 rounded-md mb-6">
          <h4 className="text-[#0D286F] font-medium mb-4">Secondary (10th)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input placeholder="Board Name" value={formData.SecondarySchool} onChange={(e) => handleInputChange("SecondarySchool", e.target.value)} />
            <Input placeholder="Total Marks (%)" value={formData.SecondaryMarks} onChange={(e) => handleInputChange("SecondaryMarks", e.target.value)} />
            <InputUpload placeholder="Upload 10th Result" onChange={(e) => handleFileChange("Secondary", e)} />
          </div>
        </div>

        {/* Higher Secondary */}
        <div className="bg-[#f5faff] border p-6 rounded-md mb-6">
          <h4 className="text-[#0D286F] font-medium mb-4">Higher Secondary (12th)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input placeholder="Board Name" value={formData.HigherSchool} onChange={(e) => handleInputChange("HigherSchool", e.target.value)} />
            <Input placeholder="Total Marks (%)" value={formData.HigherMarks} onChange={(e) => handleInputChange("HigherMarks", e.target.value)} />
            <InputUpload placeholder="Upload 12th Result" onChange={(e) => handleFileChange("Higher", e)} />
          </div>
        </div>

        {/* Graduation */}
        <div className="bg-[#f5faff] border p-6 rounded-md mb-6">
          <h4 className="text-[#0D286F] font-medium mb-4">Graduation</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input placeholder="University Name" value={formData.UGcollege} onChange={(e) => handleInputChange("UGcollege", e.target.value)} />
            <Input placeholder="Marks/CGPA (out of 10)" value={formData.UGmarks} onChange={(e) => handleInputChange("UGmarks", e.target.value)} />
            <InputUpload placeholder="Upload Graduation Marksheet" onChange={(e) => handleFileChange("UG", e)} />
          </div>
        </div>

        {/* Post Graduation */}
        <div className="bg-[#f5faff] border p-6 rounded-md">
          <h4 className="text-[#0D286F] font-medium mb-4">Post Graduation</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input placeholder="University Name" value={formData.PGcollege} onChange={(e) => handleInputChange("PGcollege", e.target.value)} />
            <Input placeholder="CGPA (out of 10)" value={formData.PGmarks} onChange={(e) => handleInputChange("PGmarks", e.target.value)} />
            <InputUpload placeholder="Upload PG Marksheet" onChange={(e) => handleFileChange("PG", e)} />
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-600 text-center text-lg mt-6 font-medium">⚠️ {error}</p>
      )}

      {/* Submit Button */}
      <div className="flex justify-end mt-10">
        <button
          type="submit"
          className="bg-[#0D286F] hover:bg-[#153a91] text-white py-2 px-6 rounded-md text-sm shadow"
        >
          Submit ▶️
        </button>
      </div>
    </form>
  </>
);

};

export default TeacherDocument;
