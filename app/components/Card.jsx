import styles from "../styles/card.module.css"

const Card = ({ data }) => {
	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<div className={styles.categoryTagContainer}>
					<p className={styles.categoryTag}>{data.categoryEN}</p>
				</div>
				<div className={styles.imageContainer}>
					<img
						className={styles.image}
						src={`data:image/png;base64,${data.image}`}
						alt="image"
					/>
				</div>
				<div className={styles.casinoNameContainer}>
					<h1 className={styles.casinoName}>
						{data.title}
					</h1>
				</div>
				<div className={styles.descriptionTitleContainer}>
					<h4 className={styles.descriptionTitle}>
						{data.descriptionTitleEN}
					</h4>
				</div>
				<div className={styles.descriptionContainer}>
					<p className={styles.description}>
						{data.descriptionEN}
					</p>
				</div>
				<a className={styles.claimButton} href={`${data.refLink}`} target="_blank">
					Claim Bonus
				</a>
			</div>
		</div>
	)
}

export default Card