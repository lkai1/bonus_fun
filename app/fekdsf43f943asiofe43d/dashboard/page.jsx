"use client"
import LoadingSpinner from "@/app/components/Loading"
import { verifyLogin } from "@/app/utils/verifyLogin.js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../../styles/dashboard.module.css"
import NewCard from "@/app/components/NewCard"
import UpdateCard from "@/app/components/UpdateCard"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"


const Dashboard = () => {
	const router = useRouter()
	const [isLoginVerifiedState, setIsLoginVerifiedState] = useState(undefined)
	const [cardsState, setCardsState] = useState([])
	const [reloadCardsState, setReloadCardsState] = useState(false)


	useEffect(() => {
		const getData = async () => {
			const result = await verifyLogin()
			setIsLoginVerifiedState(result)

			const response = await axios.get(`/api/card`);
			const sortedCards = response.data.sort((a, b) => a.order - b.order)
			setCardsState(sortedCards)
		}
		getData()
	}, [reloadCardsState])

	if (isLoginVerifiedState === false) {
		router.push("/fekdsf43f943asiofe43d")
	}
	const reloadCards = () => {
		setReloadCardsState(!reloadCardsState)
	}

	return (
		<div className={styles.main}>
			{isLoginVerifiedState === undefined ?
				<LoadingSpinner />
				:
				<div className={styles.content}>
					<NewCard reloadCards={reloadCards} />
					<h1 className={styles.updateCardsTitle}>Update cards</h1>
					<div className={styles.updateCardsContainer}>
						{cardsState.map((card) => {
							return <UpdateCard
								key={uuidv4()}
								card={card}
								reloadCards={reloadCards}
								totalNumberOfCards={cardsState.length}
							/>
						})}
					</div>
				</div>
			}
		</div>
	)
}

export default Dashboard