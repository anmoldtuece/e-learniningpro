import React from "react";
import Footer from "../../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import {
  FaAtom, FaFlask, FaLeaf, FaSquare, FaLaptopCode,
} from "react-icons/fa";

function About() {
  const features = [
    { icon: <FaAtom size={32} />, label: "Physics" },
    { icon: <FaFlask size={32} />, label: "Chemistry" },
    { icon: <FaLeaf size={32} />, label: "Biology" },
    { icon: <FaSquare size={32} />, label: "Math" },
    { icon: <FaLaptopCode size={32} />, label: "Computer" },
  ];

  return (
    <>
      <Header />

      {/* Flash card background */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-0">
          
          {/* Blue flash card */}
          <br />
          <div className="bg-blue-600 text-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16 mb-8">
            
            {/* About content */}
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl font-bold">About Us</h2>
              <p className="text-blue-100">
                At <strong>DTU E‑Learning</strong>, we believe in the power of education to transform lives...
              </p>
            </div>

            {/* Story & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="inline-block bg-white text-blue-600 px-4 py-1 rounded-full">
                  Our Story
                </h3>
                <p className="text-blue-100">
                  DTU E‑Learning was born out of a passion for learning and a desire...
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="inline-block bg-white text-blue-600 px-4 py-1 rounded-full">
                  Our Mission
                </h3>
                <p className="text-blue-100">
                  Our mission is simple yet profound: to empower individuals through education...
                </p>
              </div>
            </div>
          </div>

          {/* Faculty List */}
          <h2 className="mt-16 text-3xl font-semibold text-center text-white-800">
            Faculty List
          </h2>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center">
            {features.map(f => (
              <div
                key={f.label}
                className="bg-blue-600 text-white rounded-xl p-6 flex flex-col items-center space-y-2 shadow-lg transform hover:-translate-y-1 transition"
              >
                {f.icon}
                <span className="font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
