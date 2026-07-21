import React from "react";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-[#3B2A20] text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-5">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
           AL-OZHAN BILLING 
        </h1>

        <p className="text-center text-sm text-gray-300 mt-1">
          Perfume Billing System
        </p>

        <div className="mt-6 flex bg-white rounded-xl p-1">
          <button
            onClick={() => setActiveTab("order")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              activeTab === "order"
                ? "bg-[#3B2A20] text-white"
                : "text-gray-700"
            }`}
          >
            New Order
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              activeTab === "history"
                ? "bg-[#3B2A20] text-white"
                : "text-gray-700"
            }`}
          >
            Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;