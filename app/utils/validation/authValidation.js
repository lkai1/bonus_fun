export const validateLoginParams = (params) => {
	return (
		params
		&& typeof params === "object"
		&& Object.keys(params).length === 2
		&& typeof params.username === "string"
		&& typeof params.password === "string"
	) ? true : false
}