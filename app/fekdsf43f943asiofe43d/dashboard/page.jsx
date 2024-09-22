"use client"
import LoadingSpinner from "@/app/components/Loading"
import { verifyLogin } from "@/app/utils/verifyLogin.js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


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
		<div>
			{isLoginVerifiedState === undefined ?
				<div>
					<LoadingSpinner />
				</div>
				:
				<div>
					oksdafuieaosdiuhfriseafldksiofdksfjsdijfj
				</div>
			}
		</div>
	)
}

export default Dashboard