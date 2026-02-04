import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  
 const formatAmount = (amount, unit) => {
  if (unit === "kg") {
    if (amount < 1) return amount * 1000 + " g";
    return amount + " kg";
  }

  if (unit === "ltr") {
    if (amount < 1) return amount * 1000 + " ml";
    return amount + " L";
  }

  if (unit === "dozen") {
    if (amount === 0.5) return "Half Dozen";
    return amount + " Dozen";
  }

  return amount + " " + unit;
};


  
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <div className="p-10 pt-24">
      <Navbar />

      <h1 className="text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.length === 0 && (
        <p className="text-gray-500">
          Cart is empty
        </p>
      )}

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-6 border-b py-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover"
          />

          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {item.name}
            </h2>

            <p className="text-green-600 font-bold">
              ₹{item.price * item.amount}
            </p>

            <p className="text-sm text-gray-500">
              {formatAmount(item.amount, item.unit)}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600 font-medium"
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="mt-6 text-xl font-bold">
            Total: ₹{total}
          </div>

          
          <button
            onClick={() => {
              if (!user) {
                alert("Please login to continue");
                navigate("/login");
              } else {
                navigate("/checkout");
              }
            }}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
