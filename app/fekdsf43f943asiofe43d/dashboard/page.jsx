"use client"
import { verifyLogin } from "@/app/utils/verifyLogin.js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../../styles/dashboard.module.css"
import NewCard from "@/app/components/NewCard"
import UpdateCard from "@/app/components/UpdateCard"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import UpdateCardOrder from "@/app/components/UpdateCardOrder"
import { clearAuthToken } from "@/app/utils/authToken"


const Dashboard = () => {
	const router = useRouter()
	const [isLoginVerifiedState, setIsLoginVerifiedState] = useState(undefined)
	const [cardsState, setCardsState] = useState([])
	const [reloadCardsState, setReloadCardsState] = useState(false)
	const [updateModeState, setUpdateModeState] = useState(1)


	useEffect(() => {
		const getData = async () => {
			const result = await verifyLogin()
			setIsLoginVerifiedState(result)

			const response = await axios.get(`/api/card`);
			setCardsState(response.data)
		}
		getData()
	}, [reloadCardsState])

	if (isLoginVerifiedState === false) {
		router.push("/fekdsf43f943asiofe43d")
	}
	const reloadCards = () => {
		setReloadCardsState(!reloadCardsState)
	}

	const logout = () => {
		clearAuthToken()
		router.push("/fekdsf43f943asiofe43d")
	}

	return (
		<div className={styles.main}>
			{isLoginVerifiedState === undefined ?
				<></>
				:
				<div className={styles.content}>
					<div className={styles.logoutButtonContainer}>
						<button className={styles.logoutButton} onClick={() => { logout() }}>Logout</button>
					</div>
					<NewCard reloadCards={reloadCards} />
					<h1 className={styles.updateCardsTitle}>Update cards</h1>
					<div className={styles.selectUpdateModeContainer}>
						<button className={updateModeState === 1 ? styles.selectUpdateModeButtonSelected : styles.selectUpdateModeButton} onClick={() => { setUpdateModeState(1) }}>Content</button>
						<button className={updateModeState === 2 ? styles.selectUpdateModeButtonSelected : styles.selectUpdateModeButton} onClick={() => { setUpdateModeState(2) }}>Order EN</button>
						<button className={updateModeState === 3 ? styles.selectUpdateModeButtonSelected : styles.selectUpdateModeButton} onClick={() => { setUpdateModeState(3) }}>Order FIN</button>
					</div>
					{updateModeState === 1 ?
						<div className={styles.updateCardsContainer}>
							{cardsState.map((card) => {
								return <UpdateCard
									key={uuidv4()}
									card={card}
									reloadCards={reloadCards}
								/>
							})}
						</div>
						:
						updateModeState === 2 ?
							<div className={styles.updateCardsContainer}>
								{cardsState.filter((card) => { return !!card.orderNumberEN }).sort((a, b) => a.orderNumberEN - b.orderNumberEN).map((card) => {
									return <UpdateCardOrder key={uuidv4()} card={card} reloadCards={reloadCards} totalNumberOfCards={cardsState.filter((card) => { return !!card.orderNumberEN }).length} language={"en"} />
								})}
							</div>
							:
							<div className={styles.updateCardsContainer}>
								{cardsState.filter((card) => { return !!card.orderNumberFIN }).sort((a, b) => a.orderNumberFIN - b.orderNumberFIN).map((card) => {
									return <UpdateCardOrder key={uuidv4()} card={card} reloadCards={reloadCards} totalNumberOfCards={cardsState.filter((card) => { return !!card.orderNumberFIN }).length} language={"fin"} />
								})}
							</div>
					}
				</div>
			}
		</div>
	)
}

export default Dashboard