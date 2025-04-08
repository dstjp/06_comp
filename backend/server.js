const express = require("express");
const cors = require("cors");
const db = require("./connect");
const Part = require("./routes/partRoute");
/* const Part = require("./models/part"); */

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(Part);

/* async function run() {
	try {
		const findPart = await Part.find({});
		console.log(findPart);
	} catch (error) {
		console.log(error.message);
	}
}
run(); */

/* async function run() {
	const firstPart = new Part({ name: "Killer", type: "Queen" });
	await firstPart.save();
	console.log(firstPart);
}
run(); */

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}`);
	});
});
