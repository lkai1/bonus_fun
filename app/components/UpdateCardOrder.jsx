import styles from "../styles/updateCardsOrder.module.css"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { getAuthToken } from "../utils/authToken"


const UpdateCardOrder = ({ card, totalNumberOfCards, language, reloadCards }) => {

	const [showOrderSelectionMenu, setShowOrderSelectionMenu] = useState(false)
	const cardOrder = language === "en" ? card.orderNumberEN : card.orderNumberFIN

	const handleUpdateCard = async (number) => {
		const formData = new FormData()
		formData.append(language === "en" ? "orderNumberEN" : "orderNumberFIN", number)
		formData.append("id", card.id)

		await axios.patch("/api/card", formData, {
			headers: {
				Authorization: getAuthToken()
			}
		})
			.then(() => {
				reloadCards()
			}).catch((e) => {
				console.error(e.response.data)
			})
	}

	return (
		<div className={styles.main}>
			<div className={styles.cardContainer}>
				<div className={styles.content}>
					<div className={styles.categoryTagContainer}>
						<p className={styles.categoryTag}>{language === "en" ? card.categoryEN : card.categoryFIN}</p>
					</div>
					<div className={styles.imageContainer}>
						<img
							className={styles.image}
							src={`data:image/png;base64,${card.image}`}
							alt="image"
						/>
					</div>
					<div className={styles.casinoNameContainer}>
						<h1 className={styles.casinoName}>
							{card.title}
						</h1>
					</div>
					<div className={styles.descriptionTitleContainer}>
						<h4 className={styles.descriptionTitle}>
							{language === "en" ? card.descriptionTitleEN : card.descriptionTitleFIN}
						</h4>
					</div>
					<div className={styles.descriptionContainer}>
						<p className={styles.description}>
							{language === "en" ? card.descriptionEN : card.descriptionFIN}
						</p>
					</div>
					<a className={styles.claimButton}>
						Claim Bonus
					</a>
				</div>
			</div>
			<div className={showOrderSelectionMenu ? styles.orderSelectionMenu : styles.orderSelectionMenuHidden}>
				{Array.from({ length: totalNumberOfCards }, (_, i) => i + 1).map((number) => {
					return <button key={uuidv4()} className={styles.orderSelectionButton} onClick={() => {
						setShowOrderSelectionMenu(!showOrderSelectionMenu)
						handleUpdateCard(number)
					}}>
						{`#${number}`}
					</button>
				})}
			</div>
			<button className={styles.orderSelectionMenuButton} onClick={() => { setShowOrderSelectionMenu(!showOrderSelectionMenu) }}>{`#${cardOrder}`}</button>
		</div>
	)
}

export default UpdateCardOrder