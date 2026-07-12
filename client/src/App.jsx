import { useState } from "react";
import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";

function App() {
  const [activeTab, setActiveTab] = useState("order");

  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-5xl mx-auto p-4">
        {activeTab === "order" ? (
          <OrderForm />
        ) : (
          <OrderHistory />
        )}
      </div>
    </div>
  );
}

export default App;