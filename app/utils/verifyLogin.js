import axios from "axios"
import { getAuthToken } from "./authToken"

export const verifyLogin = async () => {
	const response = await axios.get("/api/3q89duas77dif98340oeasd3/verify_login", {
		headers: {
			Authorization: getAuthToken()
		}
	}).catch((e) => { return e.response })

	return response.status === 200 ? true : false
}