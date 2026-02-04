import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    if (!user || !token) {
      alert("Please login to place an order");
      navigate("/login");
    }
  }, [user, token, navigate]);

 
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  
  const mockPayment = async () => {
    if (!user || !token) {
      alert("Login required");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await axios.post(
        "https://organic-farm-1.onrender.com/api/orders/create",
        {
          user,
          products: cart,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      clearCart();
      alert("Payment Successful (Demo)");
      navigate("/success"); 

    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };

  
  const formatAmount = (a, u) => {
    if (u === "kg") return a < 1 ? a * 1000 + " g" : a + " kg";
    if (u === "ltr") return a < 1 ? a * 1000 + " ml" : a + " L";
    if (u === "dozen") return a === 0.5 ? "Half Dozen" : a + " Dozen";
    return a + " " + u;
  };

  return (
    <div className="pt-24">
      <Navbar />

      <div className="p-10 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b py-3"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {formatAmount(
                      item.amount,
                      item.unit
                    )}
                  </p>
                </div>

                <div className="font-bold text-green-600">
                  ₹{item.price * item.amount}
                </div>
              </div>
            ))}

            <div className="mt-6 text-xl font-bold flex justify-between">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
              onClick={mockPayment}
              className="mt-8 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 text-lg"
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}
