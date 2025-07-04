import { headers } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const GET = async () => {
	try {
		const headersList = await headers()
		const token = headersList.get('authorization')

		if (!token) return NextResponse.json("Access denied.", { status: 401 })

		try {
			jwt.verify(token, process.env.TOKEN_SECRET)
			return NextResponse.json("Verified login.", { status: 200 })
		} catch (e) {
			return NextResponse.json("Invalid token.", { status: 400 })
		}

	} catch (_e) {
		return NextResponse.json("Something went wrong, try again later.", { status: 500 })
	}
}