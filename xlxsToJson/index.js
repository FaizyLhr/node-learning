const express = require("express");
const app = express();

let XLSX = require("xlsx");

const port = process.env.PORT || 3005;

let workbook = XLSX.readFile("test.xlsx");
let workbook2 = XLSX.readFile("file2.xlsx");

let shouldAdd = [];
let shouldNotAdd = [];

function covXlsToObj(file) {
	let sheet_name_list = file.SheetNames;
	let finalData;

	sheet_name_list.forEach(function (y) {
		let worksheet = file.Sheets[y];
		// console.log(worksheet);
		let headers = {};
		let data = [];
		for (z in worksheet) {
			// console.log("zzzz", z);
			// console.log("aaaaa", z[0]);
			if (z[0] === "!") continue;

			//parse out the column, row, and value
			let tt = 0;
			for (let i = 0; i < z.length; i++) {
				// console.log("iiii", i);
				// console.log("ishisxg", z[i]);
				if (!isNaN(z[i])) {
					tt = i;
					break;
				}
			}
			let col = z.substring(0, tt);
			// console.log(col);
			let row = parseInt(z.substring(tt));
			// console.log("row", row);
			let value = worksheet[z].v;
			// console.log("value", value);

			//store header names
			if (row == 1 && value) {
				headers[col] = value;
				continue;
			}

			if (!data[row]) data[row] = {};
			data[row][headers[col]] = value;
		}
		let count = 0;
		for (let n = 0; n < data.length; n++) {
			if (data[n] === undefined) {
				// console.log(count);
				count++;
			} else if (data[n] !== undefined) {
				// console.log("returned");
				break;
			}
		}
		// console.log("count", count);
		// console.log(data);
		finalData = data.splice(count);
		// console.log("filter", finalData);
	});
	return finalData;
}

let fileArr1 = covXlsToObj(workbook);

let fileArr2 = covXlsToObj(workbook2);

fileArr1.forEach((element) => {
	let flag = true;
	// console.log(element);
	// console.log(element.id);
	fileArr2.forEach((secElement) => {
		// console.log(secElement.id);
		if (secElement.id === element.id) {
			element.eligible = false;
			shouldNotAdd.push(element);
			flag = false;
		}
	});
	if (flag === true) {
		element.eligible = true;
		shouldAdd.push(element);
	}
});

console.log("not", shouldNotAdd);
console.log("should", shouldAdd);

app.get("/", function (req, res, next) {
	res.send("Response");
});

app.listen(port, () => {
	console.log(`App is listening on port: ${port}`);
});
