import pg from 'pg'
import db from './db.js'
import createNewDB from './createNewDB.js'
import initCards from './initCards.js'
import initAdmin from './initAdmin.js'

const initDb = async () => {
	const client = new pg.Client(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/postgres`)
	await client.connect()
	await createNewDB(client)
	await db.sequelize.sync({ alter: true })
		.catch(error => console.log(error))
	await initAdmin()
	await initCards()
	await client.end()
}

export default initDb
