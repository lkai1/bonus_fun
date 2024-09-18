import jwt from "jsonwebtoken"

export const verifyJWTMiddleware = async (request, response, next) => {
	try {
		const token = request.headers.authorization
		if (!token) return response.status(401).send("Access denied!")

		try {
			jwt.verify(token, process.env.TOKEN_SECRET)
			next()
		} catch (e) {
			response.status(400).send("Invalid token!")
		}

	} catch (_error) {
		response.status(500).send("Something went wrong! Try again later.")
	}
}