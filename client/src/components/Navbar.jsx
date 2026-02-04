import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const [openAdmin, setOpenAdmin] = useState(false);

  const cartCount = cart.length;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70">
      <div className="flex justify-between items-center px-8 py-4">

        
        <h1 className="text-white text-xl font-bold">
          🌾 Organic Products
        </h1>

        <ul className="flex items-center gap-8 text-white font-bold">

          <li>
            <Link to="/" className="hover:text-green-400">
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" className="hover:text-green-400">
              Products
            </Link>
          </li>

         
          <li className="relative">
            <Link to="/cart" className="text-xl">🛒</Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </li>

          <li>
            <Link to="/my-orders">My Orders</Link>
          </li>

          
          {user?.role === "admin" && (
            <li className="relative">

              
              <button
                onClick={() => setOpenAdmin(!openAdmin)}
                className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                ⚙ Admin

                
                <span
                  className={`transition-transform duration-200 ${
                    openAdmin ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              
              <div
                className={`absolute right-0 mt-3 w-52 bg-white text-black rounded shadow-xl
                transition-all duration-200 origin-top-right
                ${openAdmin
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
              >

                <Link
                  to="/admin"
                  onClick={() => setOpenAdmin(false)}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition hover:translate-x-1"
                >
                  📊 Dashboard
                </Link>

                <Link
                  to="/admin/products"
                  onClick={() => setOpenAdmin(false)}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition hover:translate-x-1"
                >
                  🌾 Products
                </Link>

                <Link
                  to="/admin/orders"
                  onClick={() => setOpenAdmin(false)}
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition hover:translate-x-1"
                >
                  📦 Orders
                </Link>

              </div>
            </li>
          )}

          
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              <li className="text-green-400">
                Hi, {user.name}
              </li>

              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}
