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

const fileStream = fs.createReadStream(filePath);
const lineReader = readline.createInterface({
		input: fileStream,
		// to identify all instances of CR LF ('\r\n') as a single line break
		crlfDelay: Infinity
	});

console.log('File contents:\n-----');

lineReader.on('line', line => {
	console.log(line);
});

lineReader.on('error', err => {
	console.error(err);
});

lineReader.on('close', () => {
	console.log('-----');
});




