import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "kg",
    image: "",
    description: "",
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (!form.name || !form.price || !form.unit) {
      alert("Fill all required fields");
      return;
    }

    try {
      await axios.post(
        "https://organic-farm-1.onrender.com/api/admin/products",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Product Added");
      navigate("/admin/products");

    } catch (err) {
      console.error(err);
      alert("Add failed — admin only");
    }
  };

  return (
    <div className="pt-24 p-10 max-w-xl mx-auto">
      <Navbar />

      <h2 className="text-3xl font-bold mb-8">
        Add New Product 🌱
      </h2>

      <div className="space-y-4">

        <input
          name="name"
          placeholder="Product Name"
          onChange={change}
          className="border p-3 w-full"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={change}
          className="border p-3 w-full"
        />

        <select
          name="unit"
          onChange={change}
          className="border p-3 w-full"
        >
          <option value="kg">kg</option>
          <option value="pc">pc</option>
          <option value="ltr">ltr</option>
          <option value="dozen">dozen</option>
        </select>

        <input
          name="image"
          placeholder="Image URL or /apple.jpg"
          onChange={change}
          className="border p-3 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={change}
          className="border p-3 w-full"
        />

        <button
          onClick={submit}
          className="bg-green-600 text-white px-6 py-3 rounded w-full"
        >
          Save Product
        </button>

      </div>
    </div>
  );
}
