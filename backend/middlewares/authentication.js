const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// middleware to check if the user is authenticated
const authentication = (req, res, next) => {
	// get the token from the Authorization header
	const token = req.headers.authorization?.split(' ')[1];

	// check if the token is provided
	if (!token) {
		return next(createError(401, 'Token not provided'));
	}

	try {
		// check if the token is invalid
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		// set the user data in the request object
		req.user = decoded;

		return next();
	} catch (err) {
		// return an error if the token is invalid
		return next(createError(401, 'Invalid token'));
	}
};

module.exports = authentication;
