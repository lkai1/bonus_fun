import storeImage from "@/app/utils/image/storeImage.js"
import db from "../../utils/database/db.js"
import { deleteImage } from "@/app/utils/image/deleteImage.js"
import { getImage } from "@/app/utils/image/getImage.js"
import { setCardsOrdersOnDelete, setCardOrderOnCreate, setCardOrderOnUpdate } from "@/app/utils/setCardOrder.js"
import { middlewareWrapper } from "@/app/middlewares/authMiddlewares.js"

export const GET = async () => {
	try {
		const cards = await db.cards.findAll({})
		const cardsWithImages = cards.map((card) => {
			const imageBase64 = getImage(card.image)
			card.image = imageBase64
			return card
		})
		return new Response(JSON.stringify(cardsWithImages), { status: 200 })
	} catch (e) {
		return new Response("Error: Could not retrieve cards", { status: 500 })
	}
}

/* export const POST = async (request) => {
	//auth middleware
	try {
		const formData = await request.formData()
		const data = Object.fromEntries(formData);
		const imageName = await storeImage(data.image)
		data.image = imageName
		const dataWithOrder = await setCardOrderOnCreate(data)
		await db.cards.create(dataWithOrder)
		return new Response("Card created", { status: 200 })
	} catch (e) {
		console.log(e)
		return new Response("Error: Could not create card", { status: 500 })
	}
} */


const postHandler = async (request) => {
	try {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const imageName = await storeImage(data.image);
		data.image = imageName;

		const dataWithOrder = await setCardOrderOnCreate(data);
		await db.cards.create(dataWithOrder);

		return new Response("Card created", { status: 200 });
	} catch (e) {
		console.log(e);
		return new Response("Error: Could not create card", { status: 500 });
	}
};

export const POST = middlewareWrapper(postHandler);

const patchHandler = async (request) => {
	try {
		const formData = await request.formData()
		const data = Object.fromEntries(formData);
		const card = await db.cards.findOne({ where: { id: data.id } })
		let imageName = ""
		if (data.image) {
			if (card.image) {
				deleteImage(card.image)
			}
			imageName = await storeImage(data.image)
		}
		Object.keys(data).forEach((key) => { key === "image" && data.image ? card.image = imageName : key === "order" ? null : data[key] ? card[key] = data[key] : null })

		if (data.order !== card.order) {
			await setCardOrderOnUpdate(data.order, card)
		}
		await card.save()
		return new Response("Card modified", { status: 200 })
	} catch (e) {
		console.log(e)
		return new Response("Error: Could not modify card", { status: 500 })
	}
}

export const PATCH = middlewareWrapper(patchHandler);

const deleteHandler = async (request) => {
	try {
		const formData = await request.formData()
		const data = Object.fromEntries(formData);
		const card = db.cards.findOne({ id: data.id })
		deleteImage(card.image)
		setCardsOrdersOnDelete(card.order)
		card.destroy()
		return new Response("Card deleted", { status: 200 })
	}
	catch (e) {
		return new Response("Error: Could not delete card", { status: 500 })
	}
}

export const DELETE = middlewareWrapper(deleteHandler);