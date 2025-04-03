const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        "https://portfolio-rho-self-97.vercel.app", // Deployed frontend
        "http://localhost:5500" // Your local frontend (running on port 5500)
    ]
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.error("DB Connection Error:", err));
// Define a Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", ContactSchema,);

// POST route to save form data

app.post("/contact", async (req, res) => {
    console.log("📥 Raw Received Data:", req.body); // ✅ Log raw data

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.log("❌ Missing Fields:", req.body); // ✅ Log missing fields
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        console.log("✅ Message saved successfully!", newContact);
        res.status(201).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("❌ Error saving message:", error);
        res.status(500).json({ error: "Error saving message" });
    }
});
// Start Server
const PORT = process.env.PORT || 5011;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
