import React, { useState } from 'react';

function Withdrawal({ onClose, balance, onWithdraw }) {
  const [amount, setAmount] = useState('');
  const [accName, setAccName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [ifc, setIfc] = useState('');
  const [error, setError] = useState('');

  const handleWithdrawl = async () => {
    const withdrawAmount = Number(amount);
    if (!accName || !accNumber || !ifc || !withdrawAmount) {
      setError('All fields are required and amount must be valid');
      return;
    }
    if (withdrawAmount > balance) {
      setError('Insufficient Amount');
      return;
    }
    if (withdrawAmount <= 0) {
      setError('Enter a valid Amount');
      return;
    }

    try {
      // Send withdrawal request to backend
      const res = await fetch(`/api/payment/teacher/${localStorage.getItem("teacherID")}/withdraw`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: withdrawAmount,
          accName,
          accNumber,
          ifc,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Withdrawal failed");
        return;
      }
      // Update balance visually
      onWithdraw(withdrawAmount);
      onClose();
    } catch (err) {
      setError("Withdrawal failed");
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-blue-600 w-80 h-96 rounded-md relative'>
        <div className='absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div>
        <div className='flex flex-col items-center justify-center mt-10 font-semibold'>
          <h1 className='text-2xl mb-10'>Remuneration</h1>
          <div className="mb-3 text-white">Current Balance: ₹{balance}</div>
          <input type="number" placeholder='Amount' className="p-2 mb-3 rounded-md w-56 border-0 outline-0 text-gray-800"
            value={amount} onChange={(e) => setAmount(e.target.value)} />
          <input type="text" placeholder='Ac Holder Name' className="p-2 mb-3 rounded-md w-56 border-0 outline-0 text-gray-800"
            value={accName} onChange={(e) => setAccName(e.target.value)} />
          <input type="text" placeholder='Account Number' className="p-2 mb-3 rounded-md w-56 border-0 outline-0 text-gray-800"
            value={accNumber} onChange={(e) => setAccNumber(e.target.value)} />
          <input type="text" placeholder='IFC Code' className="p-2 mb-5 rounded-md w-56 border-0 outline-0 text-gray-800"
            value={ifc} onChange={(e) => setIfc(e.target.value)} />
          {error && <div className="text-red-200 mb-2">{error}</div>}
          <div onClick={handleWithdrawl} className='bg-green-700 py-2 px-5 rounded-md cursor-pointer text-white'>Withdraw</div>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;