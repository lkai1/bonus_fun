import fs from 'fs';
import path from 'path';

export const deleteImage = (imageName) => {
	try {
		const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "app/images");
		fs.unlinkSync(path.resolve(UPLOAD_DIR, imageName));
	} catch (e) {
		console.error(e)
	}
};