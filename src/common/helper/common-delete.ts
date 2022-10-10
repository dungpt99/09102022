import * as fs from "fs";

export function commonDelete(array: any) {
	array.map((e) => {
		if (e?.filename) {
			fs.unlinkSync(`public/uploads/${e.filename}`);
		}
		if (e?.img_url) {
			fs.unlinkSync(`public/uploads/${e.img_url}`);
		}
		if (e?.url) {
			fs.unlinkSync(`public/uploads/${e.url}`);
		}
	});
}
