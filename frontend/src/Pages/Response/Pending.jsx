import React from "react";
import pending from "../Images/pending.svg";
import { NavLink } from "react-router-dom";

function Pending() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10">
      <img src={pending} width={350} alt="Pending Illustration" className="mb-6" />

      <h1 className="text-[#0D286F] text-4xl font-bold mb-4">Response Pending</h1>

      <p className="text-gray-700 text-lg w-full max-w-xl text-center mb-6">
        We have received your response. Please wait a little while. Once the admin reviews and approves (or rejects) your submission, you will be notified via email.
      </p>

      <NavLink to="/" className="text-[#0D286F] hover:text-blue-700 text-lg font-medium underline">
        ◀ Go to Home
      </NavLink>
    </div>
  );
}

export default Pending;
