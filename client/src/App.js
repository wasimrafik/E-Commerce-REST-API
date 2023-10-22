import React from "react";
import Home from "./Components/homePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/login/LoginPage";
import ProductList from "./features/productList/ProductList";
import SignupPage from "./Components/signup/SignupPage";
import Cart from "./features/cart/Cart";
import CartPage from "./Components/cart/CartPage";
import NavBar from "./Components/navBar/NavBar";
import CheckOutPage from "./Components/checkOut/CheckOutPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home /> } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/allProducts" element={<ProductList />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />

      </Routes>
      </Router>
    </div>
  );
}

export default App;
