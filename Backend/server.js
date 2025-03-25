const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const session = require('express-session');

// Load environment variables
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is missing in .env file");
  process.exit(1);
}

// Import models & routes
const listItemRoutes = require("./routes/listItemRoutes");
const ListItem = require("./models/Rental_Item");
const authRoutes = require('./routes/authRoutes');

const app = express();

// Security middleware
app.use(helmet());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api", listItemRoutes); // Ensure this line is correct

// Add a test route to verify API is working
app.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Add directory creation
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Improved Database Connection Handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    console.log("Attempting to connect to MongoDB at:", mongoURI);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    console.log("✅ MongoDB Connected Successfully");

    // Verify connection
    await mongoose.connection.db.admin().ping();
    console.log("Database ping successful");

  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error("Error details:", error);
    console.error("Error name:", error.name);
    console.error("Error code:", error.code);
    throw error;
  }
};

// Start the server after connecting to DB
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();

// Global Error Handling for Unexpected Errors
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception! Shutting down...");
  console.error(err.stack || err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Promise Rejection! Shutting down...");
  console.error(err.stack || err);
  process.exit(1);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});
