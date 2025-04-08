const { MongoClient, ServerApiVersion } = require("mongodb");
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
};
