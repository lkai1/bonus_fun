import fs from "fs"
import path from "path"


const storeImage = async (imageFile) => {
	try {
		const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "app/images");
		const uniqueFilename = `${Date.now()}-${imageFile.name}`;
		const buffer = Buffer.from(await imageFile.arrayBuffer());
		fs.writeFileSync(path.resolve(UPLOAD_DIR, uniqueFilename), buffer);
		return uniqueFilename
	} catch (e) {
		console.error(e)
	}
}

export default storeImage