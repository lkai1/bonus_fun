import styles from "../styles/header.module.css"
import logoImage from "../images/LogoArtboard-12x.png"
import Image from "next/image"

const Header = () => {
	return (
		<div className={styles.main}>
			<Image
				src={logoImage}
				className={styles.logoImage}
				alt="logo"
			/>
		</div>
	)
}

export default Header