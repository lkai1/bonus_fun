import initDb from '../app/utils/database/initDb.js'

initDb().then(() => {
    console.log('✅ DB initialized')
    process.exit(0)
}).catch((err) => {
    console.error('❌ Failed to initialize DB', err)
    process.exit(1)
})
