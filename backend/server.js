/* const express = require("express");
const cors = require("cors");
const db = require("./connect");

const compRoutes = require("./routes/componentRoutes");
const buildRoutes = require("./routes/buildRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
	cors({
		origin: [
			"https://dstjp-pcbuilder-frontend.vercel.app/",
			"http://localhost:5173",
		],
		credentials: true,
	})
);
app.use(express.json());

app.use("/api/component", compRoutes);
app.use("/api/build", buildRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV !== "production") {
	db.once("open", () => {
		app.listen(PORT, () => {
			console.log(`server is running on port ${PORT}`);
		});
	});
}

module.exports = app; */

// TEST
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

// Load environment variables from config.env
dotenv.config({ path: "./config.env" });

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
const DB = process.env.MONGO_URI;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connection successful"))
	.catch((err) => {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	});

// Basic route for testing
app.get("/", (req, res) => {
	res.send("API is running...");
});

app.use("/api/component", compRoutes);
app.use("/api/build", buildRoutes);
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
