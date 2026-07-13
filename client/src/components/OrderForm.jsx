import React, { useState } from "react";
import API from "../services/api";
import ProductCard from "./ProductCard";
import TotalCard from "./TotalCard";
import OrderSuccessModal from "./WhatsApp/OrderSuccessModal";

const OrderForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [createdOrder, setCreatedOrder] = useState(null);

  const [products, setProducts] = useState([
    {
      perfumeName: "",
      ml: "",
      price: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const grandTotal = products.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  );

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        perfumeName: "",
        ml: "",
        price: "",
      },
    ]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
// Validate products
for (let i = 0; i < products.length; i++) {
  const product = products[i];

  if (!product.perfumeName.trim()) {
    alert(`Please enter Perfume Name for Product ${i + 1}`);
    return;
  }

  if (!product.ml || Number(product.ml) <= 0) {
    alert(`Please enter a valid ML for Product ${i + 1}`);
    return;
  }

  if (!product.price || Number(product.price) <= 0) {
    alert(`Please enter a valid Price for Product ${i + 1}`);
    return;
  }
}

// Optional phone validation
if (phone.trim() !== "") {
  const cleanedPhone = phone.replace(/\D/g, "");

  if (cleanedPhone.length !== 10) {
    alert("Phone number must contain exactly 10 digits.");
    return;
  }
}
  try {
    setLoading(true);

    const orderData = {
      customerName,
      phone,
      paymentMethod,
      products: products.map((p) => ({
        perfumeName: p.perfumeName,
        ml: Number(p.ml),
        price: Number(p.price),
      })),
    };

    const res = await API.post("/orders", orderData);

    // Save the created order for WhatsApp
    setCreatedOrder(res.data.order);

    // Open success modal
    setShowSuccessModal(true);

    // Clear form
    setCustomerName("");
    setPhone("");
    setPaymentMethod("Cash");

    setProducts([
      {
        perfumeName: "",
        ml: "",
        price: "",
      },
    ]);

  } catch (err) {

    alert(err.response?.data?.message || "Something went wrong");

  } finally {

    setLoading(false);

  }
};

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto py-6"
    >
      {/* Customer Details */}

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">

        <h2 className="text-2xl font-bold text-[#3B2A20] mb-6">
          Customer Details
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block mb-2 font-semibold">
              Customer Name
            </label>

            <input
              type="text"
              placeholder="Optional"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Phone Number
            </label>

            <input
              type="text"
              placeholder="Optional"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-xl p-3"
            />

          </div>

        </div>

      </div>

      {/* Products */}

      {products.map((product, index) => (

        <ProductCard
          key={index}
          index={index}
          product={product}
          handleProductChange={handleProductChange}
          removeProduct={removeProduct}
          canRemove={products.length > 1}
        />

      ))}

      <button
        type="button"
        onClick={addProduct}
        className="w-full mb-6 py-4 rounded-xl border-2 border-dashed border-[#C9A227] text-[#3B2A20] font-bold hover:bg-[#FFF8E6] transition"
      >
        + Add Another Product
      </button>

      {/* Total */}

      <TotalCard
        grandTotal={grandTotal}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 bg-[#3B2A20] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#2d2118] transition disabled:opacity-60"
      >
        {loading ? "Sending Order..." : "Send Order"}
      </button>

    </form>
    <OrderSuccessModal
  open={showSuccessModal}
  order={createdOrder}
  onClose={() => {
    setShowSuccessModal(false);
    setCreatedOrder(null);
  }}
/> </>
  );
};

export default OrderForm;