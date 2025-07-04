import db from './db.js'
import initCards from './initCards.js'
import initAdmin from './initAdmin.js'

const initDb = async () => {
	try {
		console.log('Connecting to database...')
		await db.sequelize.authenticate()
		console.log('✅ Database connection successful')

		await db.sequelize.sync({ alter: true })
		console.log('✅ Tables synced')

		await initAdmin()
		await initCards()

		console.log('✅ Database initialized')
	} catch (e) {
		console.error('❌ Error initializing database:', e)
	}
}

export default initDb
