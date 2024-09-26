import { DataTypes } from "sequelize";

const Card = (sequelize) => {
	return sequelize.define("Card", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
			primaryKey: true
		},
		orderNumberEN: {
			type: DataTypes.INTEGER
		},
		orderNumberFIN: {
			type: DataTypes.INTEGER
		},
		categoryEN: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		categoryFIN: {
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
		descriptionTitleEN: {
			type: DataTypes.STRING,
			allowNull: true
		},
		descriptionTitleFIN: {
			type: DataTypes.STRING,
			allowNull: true
		},
		descriptionEN: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		descriptionFIN: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		refLinkEN: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		refLinkFIN: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		timestamps: false
	})
}

export default Card