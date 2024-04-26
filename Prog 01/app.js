require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const swaggerSetup = require("./swagger");

const app = express();
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Swagger setup
swaggerSetup(app);

// Serve static files from the 'public' directory
// app.use(express.static('public'));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});
// Routes
app.use("/", productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app; // Export the Express app
