import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [amountMap, setAmountMap] = useState({});
  const [search, setSearch] = useState("");

  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));
  }, []);

  const setAmount = (id, value) => {
    setAmountMap(prev => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  const formatAmount = (a, u) => {
    if (u === "kg") return a < 1 ? a * 1000 + " g" : a + " kg";
    if (u === "ltr") return a < 1 ? a * 1000 + " ml" : a + " L";
    if (u === "dozen") return a === 0.5 ? "Half Dozen" : a + " Dozen";
    return a + " " + u;
  };

  
  const filtered = products.filter(p => {
    const q = (search || searchQuery).toLowerCase();
    return p.name.toLowerCase().includes(q);
  });

  return (
    <div className="pt-20">
      <Navbar />

      
      <div className="fixed top-0 left-0 w-full bg-white shadow z-40">
        <div className="flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-bold">🌾 Products</h1>

          <button onClick={() => setOpenCart(!openCart)}>
            🛒 {cart.length}
          </button>
        </div>
      </div>

      
      <div className="p-10 pb-0">
        <input
          placeholder="Search on page..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 w-80 rounded"
        />
      </div>

      
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {filtered.map(p => (

          <div key={p._id}
            className="border rounded p-4 shadow">

            <img
              src={p.image}
              className="h-40 w-full object-cover"
            />

            <h2 className="font-bold mt-2">
              {p.name}
            </h2>

            <p className="text-green-600">
              ₹{p.price} / {p.unit}
            </p>

            <select
              value={amountMap[p._id] || 1}
              onChange={e =>
                setAmount(p._id, e.target.value)
              }
              className="border mt-2 w-full"
            >
              {p.unit === "kg" && (
                <>
                  <option value={0.5}>500g</option>
                  <option value={1}>1kg</option>
                  <option value={1}>2kg</option>
                </>
              )}
              {p.unit === "ltr" && (
                <>
                  <option value={0.5}>500ml</option>
                  <option value={1}>1L</option>
                   <option value={1}>2L</option>
                </>
              )}
              {p.unit === "pc" && (
                <>
                  <option value={1}>1pc</option>
                  <option value={5}>5pc</option>
                  <option value={10}>10pc</option>
                </>
              )}
              {p.unit === "dozen" && (
                <>
                  <option value={0.5}>Half</option>
                  <option value={1}>Dozen</option>
                  <option value={2}>Dozen</option>
                </>
              )}
            </select>

            <button
              onClick={() =>
                addToCart(p, amountMap[p._id] || 1)
              }
              className="mt-3 w-full bg-green-600 text-white py-2 rounded"
            >
              Add to Cart
            </button>

          </div>

        ))}

        {filtered.length === 0 && (
          <div>No products found</div>
        )}

      </div>
    </div>
  );
}
