"use client";
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react";
import styles from "../styles/cardsContainer.module.css"
import Card from "./Card"
import axios from "axios"
import CardFI from "./CardFI";

const CardsContainer = ({ language }) => {

	const [cardsState, setCardsState] = useState([])

	useEffect(() => {
		const getCards = async () => {
			try {
				const response = await axios.get(`/api/card`, {
					params: {
						language: language
					}
				});
				setCardsState(language === "en" ? response.data.sort((a, b) => a.orderNumberEN - b.orderNumberEN) : response.data.sort((a, b) => a.orderNumberFIN - b.orderNumberFIN))
			} catch (e) {
				console.error("500: Failed to retrieve cards.")
			}
		}
		getCards()
	}, [])

	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<div className={styles.topBonusCard}>
					<h1 className={styles.topBonusTitle}>{language === "en" ? "Top bonus of the week" : "Viikon paras bonus"}</h1>
					{cardsState[0] && language === "en" ?
						<Card
							key={uuidv4()}
							data={cardsState[0]}
						/>
						:
						cardsState[0] ?
							<CardFI
								key={uuidv4()}
								data={cardsState[0]}
							/>
							:
							<></>
					}
				</div>
				<p className={styles.bonusCardsTitle}>{language === "en" ? "Win before you play" : "Voita jo ennen kuin pelaat"}</p>
				{language === "en" ?
					<div className={styles.bonusCards}>
						{cardsState.filter((card) => { return card.orderNumberEN !== cardsState[0].orderNumberEN })
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
					:
					<div className={styles.bonusCards}>
						{cardsState.filter((card) => { return card.orderNumberFIN !== cardsState[0].orderNumberFIN })
							.map((card) => {
								return (
									<CardFI
										key={uuidv4()}
										data={card}
									/>
								)
							})
						}
					</div>
				}
			</div>
		</div>
	)
}

export default CardsContainer