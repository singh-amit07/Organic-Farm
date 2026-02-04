import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="pt-24 p-10">
      <Navbar />

      <h1 className="text-3xl font-bold mb-8">
        Farmer Admin Dashboard 🌾
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          to="/admin/products"
          className="shadow p-6 rounded bg-white hover:bg-green-50"
        >
          Manage Products
        </Link>

        <Link
          to="/admin/orders"
          className="shadow p-6 rounded bg-white hover:bg-green-50"
        >
          View Orders
        </Link>

      </div>
    </div>
  );
}
