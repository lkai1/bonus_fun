import styles from "../styles/card.module.css"
import Image from "next/image"
import casinoLogo from "../images/stake.png"

const Card = () => {
	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<div className={styles.categoryTagContainer}>
					<p className={styles.categoryTag}>Crypto</p>
				</div>
				<Image
					className={styles.casinoLogo}
					src={casinoLogo}
					alt="image"
				/>
				<h1 className={styles.casinoName}>
					Stake
				</h1>
				<h4 className={styles.descriptionTitle}>
					Crypto Casino and Sports
				</h4>
				<p className={styles.description}>
					Stake is the ultimate crypto betting experience. Instantly deposit and withdraw BTC, ETH and DOGE.
				</p>
				<a className={styles.claimButton} href="https://stake.com/fi" target="_blank">
					Claim Bonus
				</a>
			</div>
		</div >
	)
}

export default Card