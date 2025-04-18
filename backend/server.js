const express = require("express");
const cors = require("cors");
const db = require("./connect");

const compRoutes = require("./routes/componentRoutes");
const buildRoutes = require("./routes/buildRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/component", compRoutes);
app.use("/api/build", buildRoutes);
app.use("/api/users", userRoutes);

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}`);
	});
});
