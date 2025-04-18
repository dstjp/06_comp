const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.SECRETKEY;

exports.createUser = async (request, response) => {
	try {
		const { username, email, password } = request.body;

		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return response.status(409).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		const user = new User({
			username,
			email,
			password: hashedPassword,
		});

		await user.save();

		response.status(201).json({ message: "User created successfully" });
	} catch (error) {
		response
			.status(500)
			.json({ message: "Server Error", error: error.message });
	}
};

exports.loginUser = async (request, response) => {
	try {
		const { email, password } = request.body;

		const user = await User.findOne({ email });
		if (!user) {
			return response.status(401).json({ message: "Login failed" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return response.status(401).json({ message: "Login failed" });
		}

		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			SECRET_KEY,
			{ expiresIn: "1h" }
		);

		response.status(200).json({ token, userId: user._id });
	} catch (error) {
		response
			.status(500)
			.json({ message: "Server Error", error: error.message });
	}
};

exports.getUser = async (request, response) => {
	try {
		const userId = request.userData.userId;
		const user = await User.findById(userId).select("-password");

		if (!user) {
			return response.status(404).json({ message: "User not found" });
		}

		response.status(200).json(user);
	} catch (error) {
		response
			.status(500)
			.json({ message: "Something went wrong", error: error.message });
	}
};
