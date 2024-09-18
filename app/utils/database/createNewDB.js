const createNewDB = async (client) => {
	try {
		const result = await client.query(
			`SELECT EXISTS(SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.DB_NAME}');`
		)
		if (!result.rows[0].exists) {
			await client.query(`CREATE DATABASE ${process.env.DB_NAME}`)
		}
	} catch (error) {
		console.log(error)
	}
}

export default createNewDB