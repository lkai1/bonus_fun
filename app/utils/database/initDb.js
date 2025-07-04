import pg from 'pg'
import db from './db.js'
import createNewDB from './createNewDB.js'
import initCards from './initCards.js'
import initAdmin from './initAdmin.js'

const initDb = async () => {
	try {
		const client = new pg.Client(process.env.DATABASE_URL, { dialect: 'postgres', logging: false })
		await client.connect()
		await createNewDB(client)
		await db.sequelize.sync({ alter: true })
		await initAdmin()
		await initCards()
		await client.end()
	} catch (e) {
		console.error(e)
	}
}

export default initDb
