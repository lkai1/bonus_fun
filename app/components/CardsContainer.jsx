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
				{language === "en" ?
					<div className={styles.bonusCards}>
						{cardsState.map((card) => {
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
						{cardsState.map((card) => {
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