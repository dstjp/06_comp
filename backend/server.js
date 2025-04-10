const express = require("express");
const cors = require("cors");
const db = require("./connect");
/* const Part = require("./routes/partRoute"); */
/* const Part = require("./models/part"); */

const partRoutes = require("./routes/partRoutes");
const buildRoutes = require("./routes/buildRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/part", partRoutes);
app.use("/api/build", buildRoutes);

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}`);
	});
});
