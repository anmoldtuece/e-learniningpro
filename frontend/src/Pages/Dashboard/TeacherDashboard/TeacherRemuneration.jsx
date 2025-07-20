import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbCurrencyRupee } from "react-icons/tb";
import Withdrawal from "./Withdrawal";

function TeacherRemuneration() {
  const { ID } = useParams();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);

  useEffect(() => {
    const getAmount = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/teacher/${ID}/balance`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await response.json();
        setAmount(user.data.newTeacher.Balance);
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    getAmount();
  }, [ID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 max-w-xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-black px-4 sm:px-8 py-3 rounded-xl shadow-lg w-full flex items-center justify-center gap-2 mb-6">
        <TbCurrencyRupee className="text-lg" />
        <span className="font-medium">Balance:</span>
        <span className="font-bold text-lg">₹{amount?.toLocaleString()}</span>
      </div>
      <button
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base"
        onClick={() => setShowWithdraw(true)}
      >
        Withdraw Funds
      </button>
      {showWithdraw && (
        <Withdrawal
          onClose={() => setShowWithdraw(false)}
          balance={amount}
          onWithdraw={(withdrawn) => setAmount((prev) => prev - withdrawn)}
        />
      )}
    </div>
  );
}

export default TeacherRemuneration;