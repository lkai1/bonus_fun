import Image from "next/image";
import styles from "../styles/footer.module.css";
import gambleAwareImage from "../images/gamble-aware-logo-w.webp"
import responsibleGamblingImage from "../images/imgbin_gambling-sports-betting-horse-racing-logo-png.png"

const Footer = () => {
	return (
		<footer className={styles.main}>
			<Image
				src={gambleAwareImage}
				height={100}
				width={300}
				alt="image"
			/>
			<Image
				src={responsibleGamblingImage}
				height={100}
				width={300}
				alt="image"
			/>
		</footer>
	)
}

export default Footer