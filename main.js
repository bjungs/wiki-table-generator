'use strict';

if (process.argv.length < 3) {
	console.log('Usage: node main <filename>');
	process.exit();
}

const fs = require('fs'),
	readline = require('readline'),
	filePath = process.argv[2]

if (!fs.existsSync(filePath)) {
	console.log(`File ${filePath} does not exist`);
	process.exit();
}

const inputStream = fs.createReadStream(filePath);

const lineReader = readline.createInterface({
		input: inputStream,
		// to identify all instances of CR LF ('\r\n') as a single line break
		crlfDelay: Infinity
	});

const TICKET_INFO_REGEX = /:(.+)/;
const OPEN_TABLE = '{|\n';
const CLOSE_TABLE = '|}';
const TABLE_ROW_DELIMITER = '|-\n';

const generateRow = data => {
	let row = TABLE_ROW_DELIMITER;
	row += `| ${data[0].trim()}\n`;
	row += `| ${data[1].trim()}\n`;
	return row;
};

let outputData = OPEN_TABLE;
lineReader.on('line', line => {
	const ticketInfo = line.split(TICKET_INFO_REGEX);
	ticketInfo.pop(); // remove empty string coming last
	if (ticketInfo.length > 1) {
		outputData += generateRow(ticketInfo);
	}
});

lineReader.on('close', () => {
	outputData += CLOSE_TABLE;
	console.log(outputData);
});

lineReader.on('error', err => {
	console.error(err);
});





