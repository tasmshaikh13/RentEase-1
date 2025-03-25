import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RentEaseNavbar from "./components/Homepage/header";
import HeroSection from "./components/Homepage/herosection";
import ListItem from "./components/listitm/ListItem";
import Categories from "./components/Categories";
import CategoryPage from "./components/Homepage/Categories"; // ✅ New component to show category items

const RoutePage = () => {
  return (
    <Router> {/* ✅ BrowserRouter should wrap everything */}
      <RentEaseNavbar />
      <Routes> {/* ✅ Routes should contain only Route components */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/List" element={<ListItem />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<Categories />} />
      </Routes>
    </Router>
  );
};

export default RoutePage;