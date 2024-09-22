import fs from "fs"
import path from "path"


const storeImage = (imageFile) => {
	try {
		const imagesDir = path.join(__dirname, "../../images")
		const uniqueFilename = `${Date.now()}-${imageFile.originalname}`;
		const filePath = path.join(imagesDir, uniqueFilename);
		fs.writeFileSync(filePath, imageFile.buffer);
		return uniqueFilename
	} catch (e) {
		console.error(e)
	}
}

export default storeImage