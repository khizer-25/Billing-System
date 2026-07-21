import React, { useEffect, useMemo, useState } from "react";
import API from "../services/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await API.get("/orders");

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customer = (order.customerName || "").toLowerCase();

      const perfumes = order.products
        .map((p) => p.perfumeName.toLowerCase())
        .join(" ");

      return (
        customer.includes(search.toLowerCase()) ||
        perfumes.includes(search.toLowerCase())
      );
    });
  }, [orders, search]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold">Loading Orders..</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Search */}

      <div className="bg-white rounded-2xl shadow p-5">

        <input
          type="text"
          placeholder="Search Customer or Perfume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#3B2A20]"
        />

      </div>

      {/* Empty */}

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-12 text-center">

          <h2 className="text-2xl font-bold">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2">
            Orders will appear here.
          </p>

        </div>
      )}

      {/* Cards */}

      {filteredOrders.map((order) => (

        <div
          key={order._id}
          className="bg-white rounded-2xl shadow overflow-hidden"
        >

          <div className="p-5">

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-xl font-bold">

                  {order.customerName || "Walk-in Customer"}

                </h2>

                <p className="text-gray-500 text-sm mt-1">

                  {new Date(order.createdAt).toLocaleString()}

                </p>

              </div>

              <div className="text-right">

                <h2 className="text-2xl font-bold text-[#3B2A20]">

                  ₹{order.grandTotal}

                </h2>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      order.paymentMethod === "Cash"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {order.paymentMethod}
                </span>

              </div>

            </div>

            <div className="mt-4 flex justify-between items-center">

              <p className="text-gray-600">

                {order.products.length} Product(s)

              </p>

              <button
                onClick={() =>
                  setExpandedOrder(
                    expandedOrder === order._id ? null : order._id
                  )
                }
                className="text-[#3B2A20] font-semibold"
              >
                {expandedOrder === order._id
                  ? "Hide Details"
                  : "View Details"}
              </button>

            </div>

          </div>

          {expandedOrder === order._id && (

            <div className="border-t bg-gray-50 p-5">

              <div className="mb-4">

                <h3 className="font-bold text-lg">
                  Customer Details
                </h3>

                <p className="mt-2">

                  <strong>Name :</strong>{" "}

                  {order.customerName || "Walk-in Customer"}

                </p>

                <p>

                  <strong>Phone :</strong>{" "}

                  {order.phone || "-"}

                </p>

              </div>

              <div>

                <h3 className="font-bold text-lg mb-3">
                  Products
                </h3>

                {order.products.map((product, index) => (

                  <div
                    key={index}
                    className="flex justify-between border rounded-xl p-4 mb-3 bg-white"
                  >

                    <div>

                      <h4 className="font-semibold">

                        {product.perfumeName}

                      </h4>

                      <p className="text-gray-500">

                        {product.ml} ml

                      </p>

                    </div>

                    <div className="font-bold">

                      ₹{product.price}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>

      ))}

    </div>
  );
};

export default OrderHistory;