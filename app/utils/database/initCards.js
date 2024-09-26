import db from "./db.js"

const initialData = [
	{
		orderNumberEN: 17,
		orderNumberFIN: 1,
		categoryEN: "Cash",
		categoryFIN: "Raha",
		image: "wildz.png",
		title: "Wildz",
		descriptionTitleEN: "Casino",
		descriptionTitleFIN: "Kasino",
		descriptionEN: "Bonus 100% up to €500 + 200 freespins",
		descriptionFIN: "Bonus 100% jopa €500 asti + 200 ilmaispyöräytystä",
		refLinkEN: "https://go.rootzaffiliates.com/visit/?bta=100042&nci=5755&utm_campaign=GEO",
		refLinkFIN: "https://go.rootzaffiliates.com/visit/?bta=100042&nci=5775&utm_campaign=FI"
	},
	{
		orderNumberEN: 13,
		orderNumberFIN: 2,
		categoryEN: "Cash",
		categoryFIN: "Raha",
		image: "rooli.png",
		title: "Rooli",
		descriptionTitleEN: "Casino",
		descriptionTitleFIN: "Kasino",
		descriptionEN: "Bonus 100% up to €4000 + 475 freespins",
		descriptionFIN: "Bonus 100% jopa €4000 asti + 475 ilmaispyöräytystä",
		refLinkEN: "https://rooli.live/n1007248b5",
		refLinkFIN: "https://rooli.live/n1f5aebd91"
	},
	{
		orderNumberEN: 8,
		orderNumberFIN: 3,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "wonaco.png",
		title: "Wonaco",
		descriptionTitleEN: "Casino & sports",
		descriptionTitleFIN: "Kasino & urheilu",
		descriptionEN: "Bonus 100% up to €500 + 200 freespins",
		descriptionFIN: "Bonus 100% jopa €500 asti + 200 ilmaispyöräytystä",
		refLinkEN: "https://wnc.servclick1move.com/?mid=225001_1335901",
		refLinkFIN: "https://wnc.servclick1move.com/?mid=225001_1335485"
	},
	{
		orderNumberFIN: 4,
		categoryFIN: "Raha",
		image: "casinotogether.png",
		title: "casinotogether",
		descriptionTitleFIN: "Kasino",
		descriptionFIN: "Bonus 100% jopa €300 asti + 100 ilmaispyöräytystä",
		refLinkFIN: "https://record.nolimitpartners.com/_pvDnTaw_ptiVAv0U_Fv2nWNd7ZgqdRLk/6872/"
	},
	{
		orderNumberFIN: 5,
		categoryFIN: "Raha",
		image: "crocoslots.png",
		title: "Crocoslots",
		descriptionTitleFIN: "Kasino",
		descriptionFIN: "Bonus 100% jopa €3000 asti + 225 ilmaispyöräytystä",
		refLinkFIN: "https://crocoslotsmedia.com/a5dcbe78c"
	},
	{
		orderNumberEN: 9,
		orderNumberFIN: 6,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "greatspin.png",
		title: "GreatSpin",
		descriptionTitleEN: "Casino & sports",
		descriptionTitleFIN: "Kasino & urheilu",
		descriptionEN: "Bonus 100% up to €1000 + 50 freespins",
		descriptionFIN: "Bonus 100% jopa €1000 asti + 50 ilmaispyöräytystä",
		refLinkEN: "https://media.highaffiliates.com/redirect.aspx?pid=13981&bid=1809",
		refLinkFIN: "https://media.highaffiliates.com/redirect.aspx?pid=14000&bid=1818"
	},
	{
		orderNumberEN: 10,
		orderNumberFIN: 7,
		categoryEN: "Cash",
		categoryFIN: "Raha",
		image: "luckywins.png",
		title: "LuckyWins",
		descriptionTitleEN: "Casino",
		descriptionTitleFIN: "Kasino",
		descriptionEN: "Bonus 100% up to €8000 + 500 freespins",
		descriptionFIN: "Bonus 100% jopa €8000 asti + 500 ilmaispyöräytystä",
		refLinkEN: "https://playluckywins.com/j75fe75c3",
		refLinkFIN: "https://playluckywins.com/jba908bb9"
	},
	{
		orderNumberEN: 11,
		orderNumberFIN: 8,
		categoryEN: "Cash",
		categoryFIN: "Raha",
		image: "megarich.png",
		title: "MegaRich",
		descriptionTitleEN: "Casino & sports",
		descriptionTitleFIN: "Kasino & urheilu",
		descriptionEN: "Bonus 100% + 100 freespins",
		descriptionFIN: "Bonus 100% + 100 ilmaispyöräytystä",
		refLinkEN: "https://record.beastpartners.io/_y5qu-K-dPJ0WqcfzuvZcQGNd7ZgqdRLk/1/",
		refLinkFIN: "https://record.beastpartners.io/_y5qu-K-dPJ2uqxJ1W5ErsWNd7ZgqdRLk/2/"
	},
	{
		orderNumberFIN: 9,
		categoryFIN: "Krypto",
		image: "olympusbet.png",
		title: "OlympusBet",
		descriptionTitleFIN: "Kasino & urheilu",
		descriptionFIN: "Bonus 100% jopa 500€ asti + 100 ilmaispyöräytystä",
		refLinkFIN: "https://online.olympusbet.com/promoRedirect?key=ej0xMzg0MjgxOSZsPTEzODQyNjMzJnA9MTU3Nzg%3D"
	},
	{
		orderNumberFIN: 10,
		categoryFIN: "Raha",
		image: "raketti.png",
		title: "Raketti",
		descriptionTitleFIN: "Kasino",
		descriptionFIN: "Jopa 20% päivittäinen cashback + 300 ilmaispyöräytystä",
		refLinkFIN: "https://media.rhinoaffiliates.com/redirect.aspx?pid=14156&bid=2236"
	},
	{
		orderNumberEN: 12,
		orderNumberFIN: 11,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "rebellioncasino.png",
		title: "RebellionCasino",
		descriptionTitleEN: "Casino",
		descriptionTitleFIN: "Kasino",
		descriptionEN: "Bonus 100% up to 300€ + 100 freespins",
		descriptionFIN: "Bonus 100% jopa 300€ asti + 100 ilmaispyöräytystä",
		refLinkEN: "https://rebellionplay.com/jd8ed8ba7",
		refLinkFIN: "https://rebellionplay.com/j3be41efb"
	},
	{
		orderNumberFIN: 12,
		categoryFIN: "Krypto",
		image: "rooster.png",
		title: "Rooster",
		descriptionTitleFIN: "Kasino & urheilu",
		descriptionFIN: "Bonus 100% jopa 5000€ asti + 300 ilmaispyöräytystä",
		refLinkFIN: "https://roosterpartner.media/n15fdec885"
	},
	{
		orderNumberEN: 14,
		orderNumberFIN: 13,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "sgcasino.png",
		title: "SG casino",
		descriptionTitleEN: "Casino & sports",
		descriptionTitleFIN: "Kasino & urheilu",
		descriptionEN: "Bonus 100% up to 500€ + 200 freespins",
		descriptionFIN: "Bonus 100% jopa 500€ asti + 200 ilmaispyöräytystä",
		refLinkEN: "https://sgc.servclick1move.com/?mid=125069_911445",
		refLinkFIN: "https://sgc.servclick1move.com/?mid=125069_912265"
	},
	{
		orderNumberEN: 15,
		orderNumberFIN: 14,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "spinfever.png",
		title: "Spinfever",
		descriptionTitleEN: "Casino & sports",
		descriptionTitleFIN: "Kasino & urheilu",
		descriptionEN: "Bonus 100% up to 2000€ + 200 freespins",
		descriptionFIN: "Bonus 100% jopa 2000€ asti + 200 ilmaispyöräytystä",
		refLinkEN: "https://deeplogic.media/aa0d92a32",
		refLinkFIN: "https://deeplogic.media/a622495c1"
	},
	{
		orderNumberFIN: 15,
		categoryFIN: "Raha",
		image: "stelario.png",
		title: "Stelario",
		descriptionTitleFIN: "Kasino",
		descriptionFIN: "Bonus 275% jopa 1200€ asti + 275 ilmaispyöräytystä",
		refLinkFIN: "https://record.joinaff.com/_XhQDsdCNLwoysOMpZep-XGNd7ZgqdRLk/7807/"
	},
	{
		orderNumberEN: 1,
		orderNumberFIN: 16,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "roobet.png",
		title: "Roobet",
		descriptionTitleEN: "Casino & sports",
		descriptionTitleFIN: "Kasino & urheilu",
		refLinkEN: "https://roobet.com/?ref=makaq",
		refLinkFIN: "https://roobet.com/?ref=makaq"
	},
	{
		orderNumberEN: 2,
		orderNumberFIN: 17,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "stake.png",
		title: "Stake",
		descriptionTitleEN: "Casino & sports",
		descriptionTitleFIN: "Kasino & urheilu",
		refLinkEN: "https://stake.com/?c=85627fea42",
		refLinkFIN: "https://stake.com/?c=85627fea42"
	},
	{
		orderNumberEN: 3,
		orderNumberFIN: 18,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "rollbit.png",
		title: "Rollbit",
		descriptionTitleEN: "Casino, sports & leverage trading",
		descriptionTitleFIN: "Kasino, urheilu & vivutus",
		refLinkEN: "https://rollbit.com/referral/bonusprovider",
		refLinkFIN: "https://rollbit.com/referral/bonusprovider"
	},
	{
		orderNumberEN: 4,
		orderNumberFIN: 19,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "shuffle.png",
		title: "Shuffle",
		descriptionTitleEN: "Casino, sports & leverage trading",
		descriptionTitleFIN: "Kasino",
		refLinkEN: "https://shuffle.com/?r=gqjHIqeUDG",
		refLinkFIN: "https://shuffle.com/?r=gqjHIqeUDG"
	},
	{
		orderNumberEN: 5,
		orderNumberFIN: 20,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "csgobig.png",
		title: "CSGOBig",
		descriptionTitleEN: "Crypto/CS2",
		descriptionTitleFIN: "Krypto/CS2",
		refLinkEN: "https://csgobig.com/r/bonusfun",
		refLinkFIN: "https://csgobig.com/r/bonusfun"
	},
	{
		orderNumberEN: 6,
		orderNumberFIN: 21,
		categoryEN: "Crypto",
		categoryFIN: "Krypto",
		image: "rustyloot.png",
		title: "RustyLoot",
		descriptionTitleEN: "Crypto/Rust",
		descriptionTitleFIN: "Krypto/Rust",
		refLinkEN: "https://rustyloot.gg/r/bonusfun",
		refLinkFIN: "https://rustyloot.gg/r/bonusfun"
	},
	{
		orderNumberEN: 7,
		categoryEN: "Cash",
		image: "leon.png",
		title: "Leon",
		descriptionTitleEN: "Casino",
		refLinkEN: "https://ksa5lu5y3o.com/?serial=36559&creative_id=154&anid="
	},
	{
		orderNumberEN: 16,
		categoryEN: "Cash",
		image: "twin.png",
		title: "Twin",
		descriptionTitleEN: "Casino",
		descriptionEN: "Bonus 100% up to 400€ + 400 freespins",
		refLinkEN: "https://ksa5lu5y3o.com/?serial=36559&creative_id=154&anid="
	},
]

const initCards = async () => {
	try {
		const cards = await db.cards.findAll({})
		if (!cards[0]) {
			await db.cards.bulkCreate(initialData)
		}
	} catch (e) {
		console.error(e)
	}
}

export default initCards