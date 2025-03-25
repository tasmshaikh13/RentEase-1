import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RentEaseNavbar from "./components/Homepage/header";
import HeroSection from "./components/Homepage/herosection";
import Categories from "./components/Homepage/Categories";
import Recommendations from "./components/Homepage/Recommendations";
import Footer from "./components/Homepage/Footer";
import CategoryPage from "./components/categories/CategoryPage";
import AddItem from "./components/listitm/AddItem";
import ListItem from "./components/listitm/ListItem"; // ✅ Import ListItem
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <Router>
      <RentEaseNavbar />
      <Routes>
        <Route path="/" element={
          <div className="app-container">
            <HeroSection />
            <Categories />
            <Recommendations />
            <Footer />
          </div>
        } />
        <Route path="/List" element={<ListItem />} /> {/* ✅ Fixed */}
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
