import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function VarifyDoc() {
  const { type, adminID, ID } = useParams();
  const [data, setData] = useState(null);
  const navigator = useNavigate();
  const [value, setValue] = useState("");

  const handleMessage = (event) => {
    setValue(event.target.value);
  };

  const Approval = async (id, type, approve, email) => {
    try {
      const data = {
        Isapproved: approve,
        remarks: value,
        email: email,
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/${adminID}/approve/${type}/${id}`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      navigator(`/admin/${adminID}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const docData = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/${adminID}/documents/${type}/${ID}`
        );
        const response = await docData.json();
        setData(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-blue-900">
      {/* Navbar */}
      <nav className="h-20 bg-blue-900 flex justify-between items-center px-6 text-white">
        <h1 onClick={() => navigator(`/admin/${adminID}`)} className="text-xl font-bold cursor-pointer">
          ◀ Back
        </h1>
        <h2 className="text-2xl font-semibold">Document Details</h2>
        <button onClick={() => navigator('/')} className="bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-blue-100">
          Logout
        </button>
      </nav>

      {/* Student Section */}
      {type === "student" && data && data.theStudent && (
        <>
          <div className="flex flex-wrap justify-center gap-10 mt-6 text-lg font-medium">
            <p>Full Name: {data.theStudent.Firstname} {data.theStudent.Lastname}</p>
            <p>Phone: {data.studentDocs.Phone}</p>
            <p>Highest Education: {data.studentDocs.Highesteducation}</p>
            <p>Address: {data.studentDocs.Address}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 mt-10">
            <DocCard img={data.studentDocs.Secondary} label="10th Marksheet" value={data.studentDocs.SecondaryMarks + "%"} />
            <DocCard img={data.studentDocs.Higher} label="12th Marksheet" value={data.studentDocs.HigherMarks + "%"} />
            <DocCard img={data.studentDocs.Aadhaar} label="Aadhar Card" />
          </div>

          <ActionArea onChange={handleMessage} value={value} onApprove={() => Approval(data.theStudent._id, "student", "approved", data.theStudent.Email)} onReject={() => Approval(data.theStudent._id, "student", "rejected", data.theStudent.Email)} onReupload={() => Approval(data.theStudent._id, "student", "reupload", data.theStudent.Email)} />
        </>
      )}

      {/* Teacher Section */}
      {type === "teacher" && data && data.theTeacher && (
        <>
          <div className="flex flex-wrap justify-center gap-10 mt-6 text-lg font-medium">
            <p>Full Name: {data.theTeacher.Firstname} {data.theTeacher.Lastname}</p>
            <p>Phone: {data.teacherDocs.Phone}</p>
            <p>Experience: {data.teacherDocs.Experience} years</p>
            <p>Address: {data.teacherDocs.Address}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 mt-10">
            <DocCard img={data.teacherDocs.Secondary} label="10th Marksheet" value={data.teacherDocs.SecondaryMarks + "%"} />
            <DocCard img={data.teacherDocs.Higher} label="12th Marksheet" value={data.teacherDocs.HigherMarks + "%"} />
            <DocCard img={data.teacherDocs.UG} label="U.G. Marksheet" value={data.teacherDocs.UGmarks} />
            <DocCard img={data.teacherDocs.PG} label="P.G. Marksheet" value={data.teacherDocs.PGmarks} />
            <DocCard img={data.teacherDocs.Aadhaar} label="Aadhar Card" />
          </div>

          <ActionArea onChange={handleMessage} value={value} onApprove={() => Approval(data.theTeacher._id, "teacher", "approved", data.theTeacher.Email)} onReject={() => Approval(data.theTeacher._id, "teacher", "rejected", data.theTeacher.Email)} onReupload={() => Approval(data.theTeacher._id, "teacher", "reupload", data.theTeacher.Email)} />
        </>
      )}
    </div>
  );
}

// Document Card Component
const DocCard = ({ img, label, value }) => (
  <div className="flex flex-col gap-2 items-center">
    <img src={img} alt={label} width={400} className="border border-blue-300 rounded-md shadow-sm" />
    <p className="font-semibold">{label} {value && <span className="text-green-600">: {value}</span>}</p>
  </div>
);

// Action Area Component
const ActionArea = ({ onChange, value, onApprove, onReject, onReupload }) => (
  <div className="flex flex-col items-center mt-12 mb-10 gap-6">
    <textarea value={value} onChange={onChange} placeholder="Write reason for rejecting application..." className="w-96 h-40 p-4 border border-blue-300 rounded-md text-blue-900" />
    <div className="flex gap-4">
      <button onClick={onApprove} className="bg-green-600 hover:bg-green-800 text-white font-bold px-6 py-2 rounded-md">Approve</button>
      <button onClick={onReject} className="bg-red-600 hover:bg-red-800 text-white font-bold px-6 py-2 rounded-md">Reject</button>
      <button onClick={onReupload} className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-md">Reupload</button>
    </div>
  </div>
);

export default VarifyDoc;
