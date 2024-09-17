import styles from "../styles/cardsContainer.module.css"
import Card from "./Card"

const CardsContainer = () => {
	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<div className={styles.topBonusCard}>
					<h1 className={styles.topBonusTitle}>Top bonus of the week</h1>
					<Card />
				</div>
				<p className={styles.bonusCardsTitle}>Win before you play</p>
				<div className={styles.bonusCards}>
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
	)
}

export default CardsContainer