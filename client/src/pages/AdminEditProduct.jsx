import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    unit: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (!token) {
      alert("Admin login required");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/products/" + id)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      });
  }, [id]);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = async () => {
    await axios.put(
      "http://localhost:5000/api/admin/products/" + id,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product Updated ✅");
    navigate("/admin/products");
  };

  if (loading) return <div className="pt-24 p-10">Loading...</div>;

  return (
    <div className="pt-24 p-10">
      <Navbar />

      <h2 className="text-2xl font-bold mb-6">
        Edit Product ✏️
      </h2>

      <div className="space-y-4 max-w-lg">

        <input name="name" value={form.name}
          onChange={change}
          className="border p-2 w-full" />

        <input name="price" type="number"
          value={form.price}
          onChange={change}
          className="border p-2 w-full" />

        <input name="unit"
          value={form.unit}
          onChange={change}
          className="border p-2 w-full" />

        <input name="image"
          value={form.image}
          onChange={change}
          className="border p-2 w-full" />

        {form.image && (
          <img src={form.image}
            className="w-40 rounded shadow" />
        )}

        <textarea name="description"
          value={form.description}
          onChange={change}
          className="border p-2 w-full" />

        <button
          onClick={save}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
