"use client"
import LoadingSpinner from "@/app/components/Loading"
import { verifyLogin } from "@/app/utils/verifyLogin.js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../../styles/dashboard.module.css"
import NewCard from "@/app/components/NewCard"


const Dashboard = () => {
	const router = useRouter()
	const [isLoginVerifiedState, setIsLoginVerifiedState] = useState(undefined)


	useEffect(() => {
		const getData = async () => {
			const result = await verifyLogin()
			setIsLoginVerifiedState(result)
		}
		getData()
	}, [])

	if (isLoginVerifiedState === false) {
		router.push("/fekdsf43f943asiofe43d")
	}

	return (
		<div className={styles.main}>
			{isLoginVerifiedState === undefined ?
				<LoadingSpinner />
				:
				<div className={styles.content}>
					<NewCard />
				</div>
			}
		</div>
	)
}

export default Dashboard