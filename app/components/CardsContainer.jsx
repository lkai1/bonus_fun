"use client";

import { useEffect, useState } from "react";
import styles from "../styles/cardsContainer.module.css"
import Card from "./Card"
import axios from "axios"

const CardsContainer = () => {

	const [cards, setCards] = useState([])

	useEffect(() => {
		const getCards = async () => {
			try {
				const response = await axios.get(`/api/card`);
				setCards(response.data)
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
					{cards.filter((card) => { return card.order === 1 })
						.map((card) => {
							return (
								<Card />
							)
						})
					}
				</div>
				<p className={styles.bonusCardsTitle}>Win before you play</p>
				<div className={styles.bonusCards}>
					{cards.filter((card) => { return card.order !== 1 }).sort((card1, card2) => { return card1.order - card2.order })
						.map((card) => {
							return (
								<Card />
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default CardsContainer