import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setOrders(res.data))
      .catch(() => alert("Login required"));
  }, []);

  const formatAmount = (a, u) => {
    if (u === "kg") return a < 1 ? a * 1000 + " g" : a + " kg";
    if (u === "ltr") return a < 1 ? a * 1000 + " ml" : a + " L";
    if (u === "dozen") return a === 0.5 ? "Half Dozen" : a + " Dozen";
    return a + " " + u;
  };

  return (
    <div className="pt-24">
      <Navbar />

      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 && (
          <p>No orders yet</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded p-6 mb-6 shadow"
          >
            <div className="flex justify-between mb-3">
              <span className="font-bold">
                Order #{order._id.slice(-6)}
              </span>

              <span className="text-sm text-gray-500">
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </span>
            </div>

            {order.products.map((p, i) => (
              <div
                key={i}
                className="flex justify-between text-sm mb-1"
              >
                <span>
                  {p.name} —{" "}
                  {formatAmount(p.amount, p.unit)}
                </span>

                <span>
                  ₹{p.price * p.amount}
                </span>
              </div>
            ))}

            <div className="mt-3 font-bold flex justify-between">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>

            <div className="text-green-600 text-sm mt-2">
              Status: {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
