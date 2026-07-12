import React from "react";

const TotalCard = ({ grandTotal, paymentMethod, setPaymentMethod }) => {
  return (
    <div className="bg-[#3B2A20] text-white rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-bold">
        Grand Total
      </h2>

      <h1 className="text-4xl font-bold mt-2 text-[#D4AF37]">
        ₹{grandTotal}
      </h1>

      <div className="mt-5">

        <label className="block mb-2">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full rounded-xl bg-white text-black p-3"
        >
           <option value="Cash">Cash</option>
    <option value="UPI">Online Payment</option>
        </select>

      </div>

    </div>
  );
};

export default TotalCard;