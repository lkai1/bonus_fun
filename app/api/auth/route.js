import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateLoginParams } from "@/app/utils/validation/authValidation"

export const POST = async (request, response) => {
	//this needs to be a "hidden" route instead of api/auth
	try {

		if (!validateLoginParams(request.body)) return response.status(400).send("Invalid login credentials!")

		const { username, password } = request.body

		const user = await db.users.findOne({ where: { username } })
		if (!user) return response.status(400).send("Invalid login credentials!")

		const validPassword = await bcrypt.compare(password, user.hash)
		if (!validPassword) return response.status(400).send("Invalid login credentials!")

		const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

		response.header("auth-token", token)

		response.status(200).send("User logged in.")

	} catch (_error) {
		response.status(500).send("Something went wrong! Try again later.")
	}
}