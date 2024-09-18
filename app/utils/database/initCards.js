import db from "./db.js"
import { v4 as uuidv4 } from "uuid"

const initialData = [
	{
		id: uuidv4(),
		order: 1,
		category: "crypto",
		categoryFin: "krypto",
		image: "Stake.png",
		title: "Stake",
		descriptionTitle: "Crypto casino and sports",
		descriptionTitleFin: "Krypto kasino ja urheilu",
		description: "Stake is the ultimate crypto betting experience. Instantly deposit and withdraw BTC, ETH and DOGE.",
		descriptionFin: "Stake on ultimaattinen krypto vedonlyönti kokemus. Talleta ja kotiuta välittömästi BTC, ETH ja DOGE.",
		refLink: "https://stake.com/?c=85627fea42"
	},
	{
		id: uuidv4(),
		order: 2,
		categoryFin: "raha",
		image: "wildz.png",
		title: "Wildz",
		descriptionTitleFin: "Kasino",
		descriptionFin: "Jopa 100%, 500€ asti + 200 ilmaispyöräytystä.",
		refLink: "https://go.rootzaffiliates.com/visit/?bta=100042&nci=5775&utm_campaign=FI"
	},
	{
		id: uuidv4(),
		order: 3,
		category: "cash",
		image: "wonaco.png",
		title: "Wonaco",
		descriptionTitle: "casino",
		description: "Welcome bonus 100% up to €500 + 200 freespins",
		refLink: "https://wnc.servclick1move.com/?mid=225001_1335901"
	},
]

const initCards = async () => {
	try {
		const cards = await db.cards.findAll({})
		if (!cards[0]) {
			await db.cards.bulkCreate(initialData)
		}
	} catch (e) {
		console.log(e)
	}
}

export default initCards