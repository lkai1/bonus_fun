"use client";
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react";
import styles from "../styles/cardsContainer.module.css"
import Card from "./Card"
import axios from "axios"

const CardsContainer = () => {

	const [cardsState, setCardsState] = useState([])

	useEffect(() => {
		const getCards = async () => {
			try {
				const response = await axios.get(`/api/card`);
				//on finnish page use finnish order
				const sortedCards = response.data.sort((a, b) => a.order - b.order)
				setCardsState(sortedCards)
			} catch (e) {
				console.log("500: Failed to retrieve cards.")
			}
		}
		getCards()
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<div className={styles.topBonusCard}>
					<h1 className={styles.topBonusTitle}>Top bonus of the week</h1>
					{cardsState[0] ?
						<Card
							key={uuidv4()}
							data={cardsState[0]}
						/>
						:
						<></>
					}
				</div>
				<p className={styles.bonusCardsTitle}>Win before you play</p>
				<div className={styles.bonusCards}>
					{cardsState.filter((card) => { return card.order !== cardsState[0].order })
						.map((card) => {
							return (
								<Card
									key={uuidv4()}
									data={card}
								/>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default CardsContainer