'use strict';

if (process.argv.length < 3) {
	console.log('Usage: node main <filename>');
	process.exit();
}

const fs = require('fs'),
	filePath = process.argv[2];

if (!fs.existsSync(filePath)) {
	console.log(`File ${filePath} does not exist`);
	process.exit();
}

// Dependencies
const readline = require('readline'),
	TableFactory = require('./lib/TableFactory');

// streams
const inputStream = fs.createReadStream(filePath);
const lineReader = readline.createInterface({
		input: inputStream,
		// to identify all instances of CR LF ('\r\n') as a single line break
		crlfDelay: Infinity
	});

const TICKET_INFO_REGEX = /:(.+)/;

let table = TableFactory.create();
lineReader.on('line', line => {
	let rowData = line.split(TICKET_INFO_REGEX);
	rowData.pop(); // 'pop' removes empty string that always comes last;
	table.insertRow(rowData);
});

lineReader.on('close', () => {
	console.log(table.toString());
});

lineReader.on('error', err => {
	console.error(err);
});





