import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      const res = await axios.get(
        "https://organic-farm-1.onrender.com/api/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setOrders(res.data);
      console.log("Orders:", res.data);

    } catch (err) {
      console.error("Load error:", err.response?.data);
      alert("Admin access required or token invalid");
    }
  };

  useEffect(() => {
    if (token) load();
  }, []);

  
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://organic-farm-1.onrender.com/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      load();

    } catch (err) {
      alert("Status update failed");
    }
  };

  return (
    <div className="pt-24 p-10">
      <Navbar />

      <h2 className="text-3xl font-bold mb-8">
        Admin Order Manager 📦
      </h2>

      
      {orders.length === 0 && (
        <p>No orders found</p>
      )}

      {orders.map((o) => (
        <div
          key={o._id}
          className="border rounded p-6 mb-6 shadow bg-white"
        >
          <div className="flex justify-between mb-3">
            <div>
              <div className="font-bold">
                Order #{o._id.slice(-6)}
              </div>

              <div className="text-sm text-gray-500">
                {new Date(o.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="font-bold text-green-700">
              ₹{o.totalAmount}
            </div>
          </div>

          <div className="mb-3">
            👤 {o.user?.name} — {o.user?.email}
          </div>

          <div className="mb-3 space-y-1">
            {o.products.map((p, i) => (
              <div key={i} className="text-sm">
                • {p.name} — ₹{p.price} × {p.amount} {p.unit}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={o.status}
              onChange={(e) =>
                updateStatus(o._id, e.target.value)
              }
              className="border px-3 py-1 rounded"
            >
              <option value="placed">placed</option>
              <option value="packed">packed</option>
              <option value="shipped">shipped</option>
              <option value="delivered">delivered</option>
            </select>

            <span className="text-sm text-gray-600">
              Current: {o.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
