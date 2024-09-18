import db from "../../utils/database/db.js"

export const GET = async () => {
	try {
		const cards = await db.cards.findAll({})
		return new Response(JSON.stringify(cards), { status: 200 })
	} catch (e) {
		return new Response(JSON.stringify("Error: Could not retrieve cards"), { status: 500 })
	}
}