import React, { useEffect, useState } from "react";
import Input from "../DocumentVerification/InputComponent/Input.jsx";
import InputUpload from "../DocumentVerification/Inputupload/InputUpload.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../Images/logo.svg";

const StudentDocument = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState("");
  const { Data } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/student/StudentDocument/${Data}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message);
      }
    };

    getData();
  }, []);

  const [formData, setFormData] = useState({
    Phone: data.Phone || "",
    Address: data.Address || "",
    Highesteducation: data.Highesteducation || "",
    SecondarySchool: data.SecondarySchool || "",
    HigherSchool: data.HigherSchool || "",
    SecondaryMarks: data.SecondaryMarks || "",
    HigherMarks: data.HigherMarks || "",
    Aadhaar: null,
    Secondary: null,
    Higher: null,
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
        `${import.meta.env.VITE_BACKEND_URL}/api/student/verification/${Data}`,
        {
          method: "POST",
          body: formDataObj,
          credentials: "include", // <-- Add this line to send cookies if needed
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
      setError(e.message);
      setLoader(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#0D286F]">
      {loader && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-center">
            <RotatingLines
              visible={true}
              height="100"
              width="100"
              color="#0D286F"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
            <p className="text-white text-xl mt-4">Uploading ...</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-10 py-4 bg-[#0D286F]">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-14" alt="logo" />
          <h1 className="text-2xl text-[#4E84C1] font-bold"> Gurukul</h1>
        </div>
        <h2 className="text-white text-xl">Document Verification (Student)</h2>
      </div>

      <form onSubmit={handleSubmit} className="px-10 py-8">
        <p className="text-xl font-semibold text-[#4E84C1] mb-6">Personal Information</p>

        <div className="flex flex-wrap gap-6 mb-10">
          <Input label="First Name" placeholder="First Name" value={data.Firstname} readonly />
          <Input label="Last Name" placeholder="Last Name" value={data.Lastname} readonly />
          <Input label="Phone No." placeholder="Phone No." value={formData.Phone} onChange={(e) => handleInputChange("Phone", e.target.value)} />
        </div>

        <div className="flex flex-wrap gap-6 mb-10">
          <Input label="Home Address" placeholder="Home Address" value={formData.Address} onChange={(e) => handleInputChange("Address", e.target.value)} />
          <Input label="Highest Education" placeholder="Highest Education" value={formData.Highesteducation} onChange={(e) => handleInputChange("Highesteducation", e.target.value)} />
          <InputUpload label="Upload Aadhar Card" placeholder="Upload Aadhar Card" value={formData.Aadhaar} onChange={(e) => handleFileChange("Aadhaar", e)} />
        </div>

        <p className="text-xl font-semibold text-[#4E84C1] mb-4">Educational Information</p>
        <div className="border border-[#0D286F] p-6 rounded-md mb-8">
          <div className="mb-6">
            <h3 className="bg-[#0D286F] text-white px-4 py-2 rounded-sm inline-block mb-4">Secondary</h3>
            <div className="flex flex-wrap gap-6">
              <Input placeholder="10th Board Name" value={formData.SecondarySchool} onChange={(e) => handleInputChange("SecondarySchool", e.target.value)} />
              <Input placeholder="Total Marks (%)" value={formData.SecondaryMarks} onChange={(e) => handleInputChange("SecondaryMarks", e.target.value)} />
              <InputUpload placeholder="Upload 10th Result" value={formData.Secondary} onChange={(e) => handleFileChange("Secondary", e)} />
            </div>
          </div>

          <div>
            <h3 className="bg-[#0D286F] text-white px-4 py-2 rounded-sm inline-block mb-4">Higher Secondary</h3>
            <div className="flex flex-wrap gap-6">
              <Input placeholder="12th Board Name" value={formData.HigherSchool} onChange={(e) => handleInputChange("HigherSchool", e.target.value)} />
              <Input placeholder="Total Marks (%)" value={formData.HigherMarks} onChange={(e) => handleInputChange("HigherMarks", e.target.value)} />
              <InputUpload placeholder="Upload 12th Result" value={formData.Higher} onChange={(e) => handleFileChange("Higher", e)} />
            </div>
          </div>
        </div>

        {error && <p className="text-red-600 text-lg text-center mb-4">!! {error}</p>}

        <div className="text-right">
          <button type="submit" className="bg-[#0D286F] text-white px-6 py-2 rounded-md hover:bg-[#1541a0] transition-all">
            Submit ▶️
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentDocument;