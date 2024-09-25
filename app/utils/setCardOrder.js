import db from "./database/db"

export const setCardOrdersOnCreateEN = async (card) => {
	const cardsCount = await db.cards.count({
		where: {
			orderNumberEN: {
				[db.Sequelize.Op.ne]: null
			}
		}
	});

	if (cardsCount === 0) {
		card.orderNumberEN = 1;
	} else {
		await db.cards.update(
			{ orderNumberEN: db.Sequelize.literal('"orderNumberEN" + 1') },
			{
				where: {
					orderNumberEN: { [db.Sequelize.Op.gte]: 2 },
				},
			}
		);
		card.orderNumberEN = 2;
	}
	return card;
};

export const setCardOrdersOnUpdateEN = async (newOrderNumber, card) => {
	const oldOrderNumber = card.orderNumberEN;

	if (newOrderNumber !== oldOrderNumber) {
		const transaction = await db.sequelize.transaction();

		try {
			if (newOrderNumber < oldOrderNumber) {
				await db.cards.update(
					{ orderNumberEN: db.Sequelize.literal('"orderNumberEN" + 1') },
					{
						where: {
							orderNumberEN: {
								[db.Sequelize.Op.gte]: newOrderNumber,
								[db.Sequelize.Op.lt]: oldOrderNumber,
							},
						},
						transaction,
					}
				);
			} else {
				await db.cards.update(
					{ orderNumberEN: db.Sequelize.literal('"orderNumberEN" - 1') },
					{
						where: {
							orderNumberEN: {
								[db.Sequelize.Op.gt]: oldOrderNumber,
								[db.Sequelize.Op.lte]: newOrderNumber,
							},
						},
						transaction,
					}
				);
			}

			card.orderNumberEN = newOrderNumber;
			await card.save({ transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
	return card;
};

export const setCardsOrdersOnDeleteEN = async (orderNumber) => {
	await db.cards.update(
		{ orderNumberEN: db.Sequelize.literal('"orderNumberEN" - 1') },
		{
			where: {
				orderNumberEN: {
					[db.Sequelize.Op.gt]: orderNumber,
				},
			},
		}
	);
};

export const setCardOrdersOnCreateFIN = async (card) => {
	const cardsCount = await db.cards.count({
		where: {
			orderNumberFIN: {
				[db.Sequelize.Op.ne]: null
			}
		}
	});

	if (cardsCount === 0) {
		card.orderNumberFIN = 1;
	} else {
		await db.cards.update(
			{ orderNumberFIN: db.Sequelize.literal('"orderNumberFIN" + 1') },
			{
				where: {
					orderNumberFIN: { [db.Sequelize.Op.gte]: 2 },
				},
			}
		);
		card.orderNumberFIN = 2;
	}

	return card;
};

export const setCardOrdersOnUpdateFIN = async (newOrderNumber, card) => {
	const oldOrderNumber = card.orderNumberFIN;

	if (newOrderNumber !== oldOrderNumber) {
		const transaction = await db.sequelize.transaction();

		try {
			if (newOrderNumber < oldOrderNumber) {
				await db.cards.update(
					{ orderNumberFIN: db.Sequelize.literal('"orderNumberFIN" + 1') },
					{
						where: {
							orderNumberFIN: {
								[db.Sequelize.Op.gte]: newOrderNumber,
								[db.Sequelize.Op.lt]: oldOrderNumber,
							},
						},
						transaction,
					}
				);
			} else {
				await db.cards.update(
					{ orderNumberFIN: db.Sequelize.literal('"orderNumberFIN" - 1') },
					{
						where: {
							orderNumberFIN: {
								[db.Sequelize.Op.gt]: oldOrderNumber,
								[db.Sequelize.Op.lte]: newOrderNumber,
							},
						},
						transaction,
					}
				);
			}

			card.orderNumberFIN = newOrderNumber;
			await card.save({ transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	return card;
};

export const setCardsOrdersOnDeleteFIN = async (orderNumber) => {
	await db.cards.update(
		{ orderNumberFIN: db.Sequelize.literal('"orderNumberFIN" - 1') },
		{
			where: {
				orderNumberFIN: {
					[db.Sequelize.Op.gt]: orderNumber,
				},
			},
		}
	);
};