const validateUsername = (username) => {
	return (
		username
		&& typeof username === "string"
		&& username.match(/^[0-9a-zA-Z]{5,50}$/)
	) ? true : false
}

const validatePassword = (password) => {
	return (
		password
		&& typeof password === "string"
		&& password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,50}$/)
	) ? true : false
}

export const validateLoginParams = (params) => {
	return (
		params
		&& typeof params === "object"
		&& Object.keys(params).length === 2
		&& validateUsername(params.username)
		&& validatePassword(params.password)
	) ? true : false
}