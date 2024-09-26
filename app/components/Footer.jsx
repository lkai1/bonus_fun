import Image from "next/image";
import styles from "../styles/footer.module.css";
import gambleAwareImage from "../images/gamble-aware-logo-w.webp"
import responsibleGamblingImage from "../images/imgbin_gambling-sports-betting-horse-racing-logo-png.png"

const Footer = () => {
	return (
		<footer className={styles.main}>
			<Image
				className={styles.gambleAwareImage}
				src={gambleAwareImage}
				alt="image"
			/>
			<Image
				className={styles.gambleAwareImage}
				src={responsibleGamblingImage}
				alt="image"
			/>
		</footer>
	)
}

export default Footer