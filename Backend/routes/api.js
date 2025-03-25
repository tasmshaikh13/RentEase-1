import express from "express";

const router = express.Router();

// ✅ Updated Products with Subcategories
const products = [
  {
    id: 1,
    title: "Laptop",
    category: "Electronics",
    subcategory: "Gaming Laptop",
    price: 500,
    image: "laptop.jpg",
    location: "New York"
  },
  {
    id: 2,
    title: "Bike",
    category: "Vehicles",
    subcategory: "Sports Bike",
    price: 50,
    image: "bike.jpg",
    location: "Los Angeles"
  },
  {
    id: 3,
    title: "Car",
    category: "Vehicles",
    subcategory: "Luxury Car",
    price: 200,
    image: "car.jpg",
    location: "Chicago"
  },
  {
    id: 4,
    title: "Camera",
    category: "Electronics",
    subcategory: "DSLR",
    price: 100,
    image: "camera.jpg",
    location: "San Francisco"
  }
];

// ✅ GET Products Route
router.get("/products", (req, res) => {
  res.status(200).json(products);
});

// ✅ GET Data Route
router.get("/getData", (req, res) => {
  res.status(200).json({ message: "Data fetched successfully!" });
});

// ✅ Handle Undefined API Routes
router.use((req, res) => {
  res.status(404).json({ message: "❌ API Route Not Found" });
});

export default router;
