import * as fs from "fs";

export function commonDelete(array: any) {
	array.map((e) => {
		if (e?.filename) {
			fs.unlinkSync(`public/uploads/${e.filename}`);
		}
		if (e?.img_url) {
			fs.unlinkSync(`public/uploads/${e.img_url}`);
		}
		if (e?.img_item) {
			fs.unlinkSync(`public/uploads/${e.img_item}`);
		}
		if (e?.img_thumbnail) {
			fs.unlinkSync(`public/uploads/${e.img_thumbnail}`);
		}
	});
}
