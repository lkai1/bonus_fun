import storeImage from "@/app/utils/image/storeImage.js"
import db from "../../utils/database/db.js"
import { deleteImage } from "@/app/utils/image/deleteImage.js"

export const GET = async () => {
	try {
		const cards = await db.cards.findAll({})
		return new Response(JSON.stringify(cards), { status: 200 })
	} catch (e) {
		return new Response("Error: Could not retrieve cards", { status: 500 })
	}
}

export const POST = async (request) => {
	try {
		const data = request.body
		const imageName = storeImage(image)
		data.image = imageName
		await db.cards.create(data)
		return new Response("Card created", { status: 200 })
	} catch (e) {
		return new Response("Error: Could not create card", { status: 500 })
	}
}

export const PATCH = async (request) => {
	try {
		const data = request.body
		const card = await db.cards.findOne({ id: data.id })
		let imageName = ""
		if (data.image) {
			deleteImage(card.image)
			imageName = storeImage(image)
		}
		Object.keys(data).forEach((key) => { key === "image" ? card.image = imageName : card[key] = data[key] })
		await db.cards.save(card)
		return new Response("Card modified", { status: 200 })
	} catch (e) {
		return new Response("Error: Could not modify card", { status: 500 })
	}
}

export const DELETE = async (request) => {
	try {
		const data = request.body
		const card = db.cards.findOne({ id: data.id })
		deleteImage(card.image)
		card.destroy()
		return new Response("Card deleted", { status: 200 })
	}
	catch (e) {
		return new Response("Error: Could not delete card", { status: 500 })
	}
}