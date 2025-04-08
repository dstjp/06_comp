/* const connect = require("./connect");

const express = require("express"); //middleware
const cors = require("cors"); //tells express how to handle resources across domains

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); //parse requests in json format

app.listen(PORT, () => {
	connect.connectToServer();
	console.log(`server is running on port ${PORT}`);
});
 */
const express = require("express");
const db = require("./connect");

const app = express();
const PORT = 3000;

app.use(express.json());

db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`server is running on port ${PORT}`);
	});
});
