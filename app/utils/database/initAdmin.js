import bcrypt from "bcryptjs"
import db from "./db.js"

const initAdmin = async () => {
	try {
		const users = await db.users.findAll({})
		if (!users[0]) {
			const username = process.env.ADMIN_USERNAME
			const password = process.env.ADMIN_PASSWORD

			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)

			db.users.create({ username, hash })
		}
	} catch (e) {
		console.error(e)
	}
}

export default initAdmin