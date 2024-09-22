import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateLoginParams } from "@/app/utils/validation/authValidation"
import { NextResponse } from "next/server"
import db from "@/app/utils/database/db"

export const POST = async (request) => {
	try {
		const data = await request.json()

		if (!validateLoginParams(data)) return NextResponse.json("Invalid login credentials.", { status: 400 })

		const { username, password } = data

		const user = await db.users.findOne({ where: { username } })
		if (!user) return NextResponse.json("Invalid login credentials.", { status: 400 })

		const validPassword = await bcrypt.compare(password, user.hash)
		if (!validPassword) return NextResponse.json("Invalid login credentials.", { status: 400 })

		const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

		return NextResponse.json({ token }, { status: 200 })

	} catch (e) {
		console.log(e)
		return NextResponse.json("Something went wrong, try again later.", { status: 500 })
	}
}