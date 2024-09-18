import { DataTypes } from "sequelize";

const Card = (sequelize) => {
	return sequelize.define("Card", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		order: {
			type: DataTypes.INTEGER,
			unique: true
		},
		category: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		categoryFin: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		descriptionTitle: {
			type: DataTypes.STRING,
			allowNull: true
		},
		descriptionTitleFin: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		descriptionFin: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		refLink: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		timestamps: false
	})
}

export default Card