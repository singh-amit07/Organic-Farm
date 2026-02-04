import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Login required");
      navigate("/login");
      return;
    }
    load();
  }, []);

  const del = async (id) => {
    if (!window.confirm("Delete product?")) return;

    try {
      await axios.delete(
        "http://localhost:5000/api/admin/products/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      load();
    } catch (e) {
      alert("Delete failed — admin only");
      console.error(e);
    }
  };

  return (
    <div className="pt-24 p-10">
      <Navbar />

     
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Admin Product Manager 🌾
        </h2>

        <Link
          to="/admin/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

     
      {products.length === 0 && (
        <div className="text-gray-500">
          No products found
        </div>
      )}

      
      <div className="grid grid-cols-6 font-bold border-b pb-2 mb-3">
        <div>Image</div>
        <div>Name</div>
        <div>Price</div>
        <div>Unit</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>

     
      {products.map((p) => (
        <div
          key={p._id}
          className="grid grid-cols-6 items-center border-b py-3"
        >
          <div>
            <img
              src={p.image}
              alt={p.name}
              className="w-12 h-12 object-cover rounded"
            />
          </div>

          <div>{p.name}</div>

          <div>₹{p.price}</div>

          <div>{p.unit}</div>

         
          <Link
            to={"/admin/edit/" + p._id}
            className="text-blue-600"
          >
            Edit
          </Link>

         
          <button
            onClick={() => del(p._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
