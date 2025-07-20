import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbUser, TbMail, TbPhone, TbMapPin, TbClock } from "react-icons/tb";
import { FiStar } from "react-icons/fi";

function TeacherProfile() {
  const { ID } = useParams();
  const [data, setdata] = useState({});
  const [Tdec, setTeacherDetails] = useState(null);
  const [starCount, setStar] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/Teacher/TeacherDocument/${ID}`
          ,{
            credentials: "include", // <-- Add this line to send cookies if needed
          }
        );
        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [ID]);

  useEffect(() => {
    const getDetails = async () => {
      if (data.Teacherdetails) {
        const Data = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/teacher/teacherdocuments`,
          {
            method: 'POST',
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ teacherID: data.Teacherdetails }),
          }
        );
        const res = await Data.json();
        setTeacherDetails(res.data);
      }
    };
    getDetails();
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 h-fit border border-blue-100 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <TbUser className="text-4xl text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 break-words">
          {data?.Firstname} {data?.Lastname}
        </h2>
        <div className="flex justify-center items-center gap-1">
          {[...Array(starCount)].map((_, index) => (
            <FiStar key={index} className="text-yellow-400 fill-current" size={20} />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
          <TbMail className="text-blue-600 text-xl mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
            <p className="text-gray-800 font-medium break-words text-sm sm:text-base">{data?.Email}</p>
          </div>
        </div>
        {Tdec && (
          <>
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
              <TbPhone className="text-green-600 text-xl mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Phone</p>
                <p className="text-gray-800 font-medium text-sm sm:text-base">{Tdec.Phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
              <TbMapPin className="text-red-600 text-xl mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                <p className="text-gray-800 font-medium break-words text-sm sm:text-base">{Tdec.Address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
              <TbClock className="text-purple-600 text-xl mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Experience</p>
                <p className="text-gray-800 font-medium text-sm sm:text-base">{Tdec.Experience} years</p>
              </div>
            </div>   
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
              <TbUser className="text-blue-600 text-xl mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Graduation College</p>
                <p className="text-gray-800 font-medium text-sm sm:text-base">{Tdec.UGcollege}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
              <TbUser className="text-blue-600 text-xl mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">Post Graduation College</p>
                <p className="text-gray-800 font-medium text-sm sm:text-base">{Tdec.PGcollege}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherProfile;