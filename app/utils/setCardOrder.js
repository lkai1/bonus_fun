import db from "./database/db"

export const setCardOrderOnCreate = async (card) => {
	const cardsCount = await db.cards.count();

	if (cardsCount === 0) {
		card.order = 1;
	} else {
		await db.cards.update(
			{ order: db.Sequelize.literal('"order" + 1') },
			{
				where: {
					order: { [db.Sequelize.Op.gte]: 2 },
				},
			}
		);
		card.order = 2;
	}

	return card;
};

export const setCardOrderOnUpdate = async (newOrderNumber, card) => {
	const oldOrderNumber = card.order;

	if (newOrderNumber !== oldOrderNumber) {
		const transaction = await db.sequelize.transaction();

		try {
			if (newOrderNumber < oldOrderNumber) {
				await db.cards.update(
					{ order: db.Sequelize.literal('"order" + 1') },
					{
						where: {
							order: {
								[db.Sequelize.Op.gte]: newOrderNumber,
								[db.Sequelize.Op.lt]: oldOrderNumber,
							},
						},
						transaction,
					}
				);
			} else {
				await db.cards.update(
					{ order: db.Sequelize.literal('"order" - 1') },
					{
						where: {
							order: {
								[db.Sequelize.Op.gt]: oldOrderNumber,
								[db.Sequelize.Op.lte]: newOrderNumber,
							},
						},
						transaction,
					}
				);
			}

			card.order = newOrderNumber;
			await card.save({ transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	return card;
};




export const setCardsOrdersOnDelete = async (orderNumber) => {
	await db.cards.update(
		{ order: db.Sequelize.literal('"order" - 1') },
		{
			where: {
				order: {
					[db.Sequelize.Op.gt]: orderNumber,
				},
			},
		}
	);
};