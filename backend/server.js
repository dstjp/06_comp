const express = require("express");
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

module.exports = app;
