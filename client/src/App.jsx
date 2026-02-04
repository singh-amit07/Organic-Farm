import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminOrders from "./pages/AdminOrders";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/success" element={<Success />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/admin"element={<AdminRoute>  <AdminDashboard /></AdminRoute>}/>
       <Route path="/admin"element={<AdminRoute>  <AdminProducts/></AdminRoute>}/>
       
<Route path="/admin/add" element={<AdminRoute><AdminAddProduct/></AdminRoute>} />
<Route path="/admin/edit/:id" element={<AdminRoute><AdminEditProduct/></AdminRoute>} />
<Route path="/admin/orders" element={<AdminRoute><AdminOrders/></AdminRoute>} />
<Route path="/admin/add" element={<AdminAddProduct />} />
<Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/edit/:id" element={<AdminEditProduct />} />


    </Routes>
  );
}

export default App;

