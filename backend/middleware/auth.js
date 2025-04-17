const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const SECRET_KEY = process.env.SECRETKEY;

module.exports = (request, response, next) => {
	try {
		const token = request.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, SECRET_KEY);
		request.userData = { userId: decodedToken.userId };
		next();
	} catch (error) {
		return response.status(401).json({ message: "Authentication failed!" });
	}
};
