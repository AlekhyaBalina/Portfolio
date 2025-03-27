const mongoose = require("mongoose");

// Corrected MongoDB URI (encoded @ as %40)
const MONGO_URI = "mongodb+srv://alekhya_admin:Alex%40405@cluster0.t2zetvs.mongodb.net/portfoliodb?retryWrites=true&w=majority&appName=Cluster0"; 

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.error("DB Connection Error:", err);
        process.exit(1);
    }
}

module.exports = connectDB;

