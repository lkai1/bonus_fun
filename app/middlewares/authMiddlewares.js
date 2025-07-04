import jwt from "jsonwebtoken"
import { headers } from "next/headers"

const verifyJWTMiddleware = async (_request, response, next) => {
	try {
		const headersList = await headers()
		const token = headersList.get('authorization')

		if (!token) return response.status(401).send("Access denied!")

		try {
			jwt.verify(token, process.env.TOKEN_SECRET)
			next()
		} catch (e) {
			console.error(e)
			response.status(400).send("Invalid token!")
		}

	} catch (e) {
		response.status(500).send("Something went wrong! Try again later.")
	}
}

export const middlewareWrapper = (handler) => async (req) => {
	return new Promise((resolve, reject) => {
		const res = {
			status: (status) => {
				res.statusCode = status;
				return res;
			},
			send: (message) => {
				resolve(new Response(message, { status: res.statusCode }));
			},
		};

		verifyJWTMiddleware(req, res, async () => {
			const response = await handler(req);
			resolve(response);
		});
	});
};