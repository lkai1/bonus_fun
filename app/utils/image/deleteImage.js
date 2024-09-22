import fs from 'fs';
import path from 'path';

export const deleteImage = (imageName) => {
	try {
		fs.unlinkSync(path.join(__dirname, "../../images/", imageName));
	} catch (e) {
		console.error(e)
	}
};