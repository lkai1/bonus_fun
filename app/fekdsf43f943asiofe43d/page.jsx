"use client";
import axios from "axios"
import { useState } from "react";
import styles from "../styles/adminLogin.module.css"
import Header from "../components/Header";
import { clearAuthToken, setAuthToken } from "../utils/authToken";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
	const [usernameState, setUsernameState] = useState("")
	const [passwordState, setPasswordState] = useState("")
	const router = useRouter()

	const emptyCredentials = () => {
		setUsernameState("")
		setPasswordState("")
	}

	const login = async (username, password) => {
		await axios.post("/api/3q89duas77dif98340oeasd3", { username, password })
			.then((response) => {
				emptyCredentials()
				setAuthToken(response.data.token)
				router.push("/fekdsf43f943asiofe43d/dashboard")
			}).catch((e) => {
				emptyCredentials()
				clearAuthToken()
				console.error(e.response.data)
			})
	}

	return (
		<div className={styles.main}>
			<Header />
			<div className={styles.loginFormContainer}>
				<form className={styles.loginForm} onSubmit={(e) => {
					e.preventDefault()
					login(usernameState, passwordState)
				}}>
					<input className={styles.input} type="text" placeholder="username" value={usernameState} onChange={(e) => { setUsernameState(e.target.value) }} />
					<input className={styles.input} type="password" placeholder="password" value={passwordState} onChange={(e) => { setPasswordState(e.target.value) }} />
					<button className={styles.button} type="submit">
						login
					</button>
				</form>
			</div>
		</div>
	)
}

export default AdminLogin