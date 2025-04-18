const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

/* const connectionString = process.env.M_URI; */
const connectionString = "mongodb://localhost:3000";

mongoose.connect(connectionString);

module.exports = mongoose.connection;
