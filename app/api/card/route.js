import storeImage from "@/app/utils/image/storeImage.js"
import db from "../../utils/database/db.js"
import { deleteImage } from "@/app/utils/image/deleteImage.js"
import { getImage } from "@/app/utils/image/getImage.js"
import { setCardsOrdersOnDeleteEN, setCardOrdersOnCreateEN, setCardOrdersOnUpdateEN, setCardsOrdersOnDeleteFIN, setCardOrdersOnCreateFIN, setCardOrdersOnUpdateFIN } from "@/app/utils/setCardOrder.js"
import { middlewareWrapper } from "@/app/middlewares/authMiddlewares.js"

export const GET = async (request) => {
	try {
		const { searchParams } = new URL(request.url);
		const language = searchParams.get('language');
		let cards = []

		if (language === "en") {
			cards = await db.cards.findAll({
				where: {
					[db.Sequelize.Op.or]: [
						{ categoryEN: { [db.Sequelize.Op.ne]: '', [db.Sequelize.Op.not]: null } },
						{ descriptionTitleEN: { [db.Sequelize.Op.ne]: '', [db.Sequelize.Op.not]: null } },
						{ descriptionEN: { [db.Sequelize.Op.ne]: '', [db.Sequelize.Op.not]: null } }
					]
				}
			});
		} else if (language === "fin") {
			cards = await db.cards.findAll({
				where: {
					[db.Sequelize.Op.or]: [
						{ categoryFIN: { [db.Sequelize.Op.ne]: '', [db.Sequelize.Op.not]: null } },
						{ descriptionTitleFIN: { [db.Sequelize.Op.ne]: '', [db.Sequelize.Op.not]: null } },
						{ descriptionFIN: { [db.Sequelize.Op.ne]: '', [db.Sequelize.Op.not]: null } }
					]
				}
			});
		} else {
			cards = await db.cards.findAll({})
		}

		const cardsWithImages = cards.map((card) => {
			const imageBase64 = getImage(card.image)
			card.image = imageBase64
			return card
		})
		return new Response(JSON.stringify(cardsWithImages), { status: 200 })
	} catch (e) {
		console.log(e)
		return new Response("Error: Could not retrieve cards", { status: 500 })
	}
}

const postHandler = async (request) => {
	try {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		const imageName = await storeImage(data.image);
		data.image = imageName;

		let dataWithOrder = data

		if (data.categoryEN || data.descriptionTitleEN || data.descriptionEN && data.image) {
			dataWithOrder = await setCardOrdersOnCreateEN(data);
		}

		if (data.categoryFIN || data.descriptionTitleFIN || data.descriptionFIN && data.image) {
			dataWithOrder = await setCardOrdersOnCreateFIN(data);
		}

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

		if (!!data.orderNumberEN) {
			data.orderNumberEN = Number(data.orderNumberEN)
		} else if (!!data.orderNumberFIN) {
			data.orderNumberFIN = Number(data.orderNumberFIN)
		}
		if ((data.categoryEN || data.descriptionTitleEN || data.descriptionEN) && !!card.orderNumberEN == false) {
			const result = await setCardOrdersOnCreateEN(data)
			card.orderNumberEN = result.orderNumberEN
		}
		if ((data.categoryFIN || data.descriptionTitleFIN || data.descriptionFIN) && !!card.orderNumberFIN == false) {
			const result = await setCardOrdersOnCreateFIN(data)
			card.orderNumberFIN = result.orderNumberFIN
		}

		if (Object.values(data).length === 2 && (!!data.orderNumberEN || !!data.orderNumberFIN)) {
			if (data.orderNumberEN !== card.orderNumberEN && !!card.orderNumberEN) {
				await setCardOrdersOnUpdateEN(data.orderNumberEN, card)
			}

			if (data.orderNumberFIN !== card.orderNumberFIN && !!card.orderNumberFIN) {
				await setCardOrdersOnUpdateFIN(data.orderNumberFIN, card)
			}
		} else {
			let imageName = ""
			if (data.image) {
				if (card.image) {
					deleteImage(card.image)
				}
				imageName = await storeImage(data.image)
			}
			Object.keys(data).forEach((key) => {
				if (key === "image" && data.image) {
					card.image = imageName
				} else if (key !== "orderNumberEN" && key !== "orderNumberFIN" && key !== "image") {
					card[key] = data[key]
				}
			})

			console.log(card)
			if (!card.descriptionEN && !card.descriptionTitleEN && !card.categoryEN) {
				card.orderNumberEN = null
			}

			if (!card.descriptionFIN && !card.descriptionTitleEFIN && !card.categoryFIN) {
				card.orderNumberFIN = null
			}

			if (data.orderNumberEN !== card.orderNumberEN && !!card.orderNumberEN) {
				await setCardOrdersOnUpdateEN(data.orderNumberEN, card)
			}

			if (data.orderNumberFIN !== card.orderNumberFIN && !!card.orderNumberFIN) {
				await setCardOrdersOnUpdateFIN(data.orderNumberFIN, card)
			}
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
		const card = await db.cards.findOne({ where: { id: data.id } })

		deleteImage(card.image)
		if (!!card.orderNumberEN) {
			card.orderNumberEN = Number(card.orderNumberEN)
			setCardsOrdersOnDeleteEN(card.orderNumberEN)
		}

		if (!!card.orderNumberFIN) {
			card.orderNumberFIN = Number(card.orderNumberFIN)
			setCardsOrdersOnDeleteFIN(card.orderNumberFIN)
		}
		await card.destroy()
		return new Response("Card deleted", { status: 200 })
	}
	catch (e) {
		console.log(e)
		return new Response("Error: Could not delete card", { status: 500 })
	}
}

export const DELETE = middlewareWrapper(deleteHandler);