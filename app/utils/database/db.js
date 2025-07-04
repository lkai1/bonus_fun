import Sequelize from "sequelize"
import User from "../../models/User.js"
import Card from "../../models/Card.js"

const sequelize = new Sequelize.Sequelize(process.env.DB_URL, { logging: false })

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize;

db.users = User(sequelize)
db.cards = Card(sequelize)

export default db