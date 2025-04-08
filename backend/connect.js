const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const connectionString = process.env.M_URI;

mongoose.connect(connectionString);

module.exports = mongoose.connection;
