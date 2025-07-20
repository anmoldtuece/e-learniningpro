import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TeacherWelcome() {
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

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h1 className="text-4xl font-bold text-[#008280] mb-4">Welcome to Gurukul</h1>
      <h2 className="text-2xl text-gray-700 font-semibold">
        {data?.Firstname} {data?.Lastname}
      </h2>
      <p className="mt-4 text-lg text-gray-500">Select an option from the sidebar to get started.</p>
    </div>
  );
}

export default TeacherWelcome;