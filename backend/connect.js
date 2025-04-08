/* const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const client = new MongoClient(process.env.M_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let database;

module.exports = {
	connectToServer: () => {
		database = client.db("compData");
	},
	getDb: () => {
		return database;
	},
}; */

const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const connectionString = process.env.M_URI;

mongoose.connect(connectionString);

module.exports = mongoose.connection;
