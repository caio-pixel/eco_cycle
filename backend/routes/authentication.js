const bcrypt = require('bcrypt');
const createError = require('http-errors');
const express = require('express');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();
const prisma = new PrismaClient();

// user login
router.post(
	'/login',
	asyncHandler(async (req, res, next) => {
		// get data from the request
		const payload = req.body;

		// get the user data
		const user = await prisma.user.findUnique({
			where: { username: payload.email },
		});

		// check if the user exists
		if (!user) {
			return next(createError(401, 'Invalid username or password.'));
		}

		// check if the password is correct
		// const isPasswordValid = await bcrypt.compare(payload.password, user.password);
		const isPasswordValid = payload.password == user.password
		if (!isPasswordValid) {
			return next(createError(401, 'Invalid username or password.'));
		}

		// sign a token
		const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
		});

		// send success response
		return res.status(200).json({
			success: true,
			status: 200,
			message: 'Login successful..',
			data: { token },
		});
	})
);

// user logout
router.post(
	'/logout',
	asyncHandler(async (req, res) => {
		// send success response
		return res.sendStatus(204);
	})
);

module.exports = router;
