import path from "path"
import fs from "fs"

export const getImage = (imageName) => {
	try {
		const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "app/images");
		const image = fs.readFileSync(path.resolve(UPLOAD_DIR, imageName))
		return image.toString('base64')
	} catch (e) {
		console.error(e)
	}
}