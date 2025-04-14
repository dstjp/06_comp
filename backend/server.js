const express = require("express");
const cors = require("cors");
const db = require("./connect");

const partRoutes = require("./routes/partRoutes");
const buildRoutes = require("./routes/buildRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/component", partRoutes);
app.use("/api/build", buildRoutes);

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}`);
	});
});
