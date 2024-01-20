import * as path from 'path';
import { copyFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { File } from 'formidable';

export async function uploadImg(
	id: string | number | undefined,
	files?: File[],
	folder: string = '',
	optionalSuffix?: string,
	oldFile?: string
) {
	let _file = null;
	if (files && Object.keys(files).length && Array.from(files).length)
		_file = files[0];
	let newPath = '';
	if (_file) {
		const { filepath, mimetype } = _file;
		try {
			if (!existsSync(path.join('public', 'uploads' + folder))) {
				mkdirSync(path.join('public', 'uploads' + folder), { recursive: true });
			}
		} catch (e) {
			console.log(e);
		}
		const copyFilePath = path.join(
			'public',
			'uploads' + folder,
			`${id}${optionalSuffix ? `_${optionalSuffix}` : ''}`
		);
		try {
			if (oldFile) {
				const pathToRm = path.join('public', oldFile);
				const fileFound = existsSync(pathToRm);
				if (fileFound) {
					rmSync(pathToRm);
				}
			} else {
				const fileFound = existsSync(copyFilePath);
				if (fileFound) {
					rmSync(copyFilePath);
				}
			}
		} catch (e) {
			console.log(e);
		}
		newPath = `${copyFilePath}.${mimetype?.split('/')[1]}`;
		copyFileSync(filepath, newPath);
	}
	return newPath.substring(6);
}
