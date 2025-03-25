// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors()); // Enable CORS

// app.get("/getData", (req, res) => {
//   res.send("Hello from Backend!");
// });

// app.listen(8080, () => console.log("Backend running on port 8080"));

// const express = require("express");
// const cors = require("cors");

import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for frontend requests
app.use(cors({
  origin: "http://localhost:3000", // Change if your frontend URL is different
  credentials: true
}));

app.use(express.json()); // Enable JSON body parsing

// Example API Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend Connected Successfully!" });
});

const PORT = 5000; // Backend runs on port 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
