import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CompletedCourses() {
  const { ID } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/course/student/${ID}/completed`, { withCredentials: true })
      .then(res => {
        console.log("Completed courses response:", res.data);
        setCourses(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching completed courses:", err);
        setLoading(false);
      });
  }, [ID]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 ml-64">
      <h2 className="text-2xl font-bold mb-4">Completed Courses</h2>
      {courses.length === 0 ? (
        <p>No completed courses found.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course._id} className="bg-white shadow rounded p-4">
              <h3 className="font-semibold">{course.coursename}</h3>
              <p>{course.description}</p>
              <p className="text-green-600 font-bold">Completed</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedCourses;