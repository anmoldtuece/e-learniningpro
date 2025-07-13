import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

function CompletedCourses() {
  const { ID } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/course/student/${ID}/completed`, { withCredentials: true })
      .then(res => {
        setCourses(res.data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [ID]);

  // Generate a random certificate number
  const generateCertificateNumber = () => {
    return 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // PDF generation function
  const handleDownloadCertificate = async (course) => {
    const certificateNumber = generateCertificateNumber();

    // Store certificate number in DB
    try {
      await axios.post('/api/certificate/store', {
        studentId: ID,
        courseId: course._id,
        certificateNumber,
      }, { withCredentials: true });
    } catch (err) {
      alert("Error storing certificate number!");
      return;
    }

    const doc = new jsPDF();
    doc.setFillColor(0, 130, 128);
    doc.rect(0, 0, 210, 297, 'F'); // background color

    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text("Certificate of Completion", 30, 40);

    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`This is to certify that`, 30, 60);

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(`${course.studentName || "Student Name"}`, 30, 75);

    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    doc.text(`has successfully completed the course`, 30, 90);

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(`${course.coursename}`, 30, 105);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(`Description: ${course.description}`, 30, 120);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(`Teacher: ${course.teacherName || "Teacher Name"}`, 30, 135);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(`Certificate Number: ${certificateNumber}`, 30, 150);

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 30, 165);

    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text("eSigned by eLearning", 30, 180);

    doc.save(`${course.coursename}_certificate.pdf`);
  };

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
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => handleDownloadCertificate(course)}
              >
                Download Certificate
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedCourses;