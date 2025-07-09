import React from "react";
import Header from "../Header/Header.jsx";
import {
  FaAtom, FaFlask, FaLeaf, FaSquare, FaLaptopCode,
} from "react-icons/fa";

const admins = [
  {
    name: "Anmol Pandey",
    branch: "DTU ECE 4th year",
    img: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png",
  },
  {
    name: "Naman Adlakha",
    branch: "DTU CSE 4th year",
    img: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png",
  },
  {
    name: "Divyansh",
    branch: "DTU ECE 4th year",
    img: "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png",
  },
];

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

      {/* Main content section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-20 w-full">
        <div className="w-full px-6 lg:px-8">
          
          {/* Hero card with improved spacing */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-3xl shadow-2xl p-10 md:p-14 lg:p-20 mb-20 relative overflow-hidden mx-4 md:mx-8 lg:mx-12">
            
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
            
            {/* About content with better typography */}
            <div className="relative z-10 space-y-8 text-center md:text-left mb-12">
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                About Us
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                At <strong className="text-white">E‑Learning</strong>, we believe in the power of education to transform lives and unlock human potential through innovative digital learning experiences.
              </p>
            </div>

            {/* Story & Mission with enhanced layout */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="space-y-6">
                <h3 className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                  Our Story
                </h3>
                <p className="text-blue-50 leading-relaxed text-lg">
                  E‑Learning was born out of a passion for learning and a desire to make quality education accessible to everyone. We recognized the transformative power of technology in education and set out to create a platform that bridges the gap between traditional learning and modern digital experiences.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                  Our Mission
                </h3>
                <p className="text-blue-50 leading-relaxed text-lg">
                  Our mission is simple yet profound: to empower individuals through education by providing innovative, accessible, and engaging learning experiences. We strive to create an inclusive environment where every learner can achieve their full potential and contribute meaningfully to society.
                </p>
              </div>
            </div>
          </div>

          {/* Faculty section with improved styling */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 mx-4 md:mx-8 lg:mx-12">
              Discover our comprehensive range of subjects taught by experienced faculty members
            </p>
          </div>

          {/* Faculty cards with enhanced design */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mx-4 md:mx-8 lg:mx-12">
            {features.map((feature, index) => (
              <div
                key={feature.label}
                className="group bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <span className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>

          {/* Additional content section */}
          <div className="mt-24 bg-white rounded-3xl shadow-xl p-10 md:p-16 mx-4 md:mx-8 lg:mx-12">
            <div className="text-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                Why Choose E‑Learning?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <FaAtom className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Expert Faculty</h4>
                  <p className="text-gray-600">Learn from industry experts and experienced educators</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <FaLaptopCode className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Modern Technology</h4>
                  <p className="text-gray-600">Cutting-edge learning platforms and interactive tools</p>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <FaLeaf className="text-blue-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">Flexible Learning</h4>
                  <p className="text-gray-600">Study at your own pace with 24/7 access to resources</p>
                </div>
              </div>
            </div>
          </div>

          {/* Admins section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl mt-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Admins</h2>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              {admins.map((admin, idx) => (
                <div key={idx} className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow w-60">
                  <img
                    src={admin.img}
                    alt={admin.name}
                    className="w-24 h-24 rounded-full mb-3 object-cover border-2 border-blue-200"
                  />
                  <div className="text-lg font-semibold text-blue-900">{admin.name}</div>
                  <div className="text-gray-700">{admin.branch}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;