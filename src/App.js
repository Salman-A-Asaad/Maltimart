import "./App.css";
import React, { useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  Shop,
  ProductInfo,
  Cart,
  Login,
  Sginup,
  CheckOut,
  Dashboard,
  ProductInfoAdmin,
} from "./pages";
import { Navbar, Footer } from "./sections/index";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAllProducts } from "./redux/slices/productSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sginup" element={<Sginup />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productinfoadmin/:id" element={<ProductInfoAdmin />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
