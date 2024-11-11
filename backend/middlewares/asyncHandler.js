const createError = require('http-errors');

// middleware to handle async functions
const asyncHandler = (handler) => {
	return async (req, res, next) => {
		try {
			// execute the function
			await handler(req, res, next);
		} catch (err) {
			// pass the error to the error handler
			next(createError(500, 'An unexpected error occurred', { cause: err }));
		}
	};
};

module.exports = asyncHandler;