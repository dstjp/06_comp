const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const compRoutes = require("./routes/componentRoutes");
const buildRoutes = require("./routes/buildRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
	cors({
		origin: ["https://dstjp-pcbuilder.netlify.app", "http://localhost:5173"],
		credentials: true,
	})
);

const connectDB = async () => {
	try {
		const connectionString = process.env.M_URI || process.env.M_URI;
		mongoose.connect(connectionString);
		console.log("MongoDB connection successful");
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
		process.exit(1);
	}
};

connectDB();

app.get("/", (res) => {
	res.send("API is running...");
});

app.use("/api/component", compRoutes);
app.use("/api/build", buildRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
