'use strict';

const TABLE_SYMBOLS = Object.freeze({
	OPEN: '{|\n',
	CLOSE: '|}',
	ROW_DELIMITER: '|-\n',
	DATA_START: '|'
});

/**
 * Returns a new empty table object.
 * @returns {object} {
 *     getRows: {function}: returns a copy of the current rows array,
 *     insertRow: {function(string)}: inserts a new row into the table,
 *     toString: {function}: stringifies the trable into Wiki format,
 *     separator: {RegExp}: RegExp object to separate the line into header and data
 * }
 */
module.exports.create = (separator = ':') => {
	let _rows = [];
	return Object.defineProperties({}, {
		getRows: {
			value: () => Object.freeze(_rows.slice())
		},
		insertRow: {
			value: insertRow(_rows)
		},
		toString: {
			value: toString(_rows)
		},
		separator: {
			value: new RegExp(`${separator}(.+)`)
		}
	});
}

/**
 * @param _rows
 * @returns {function(): undefined}
 */
const insertRow = _rows => (
	/**
	 * Inserts a row at the end of the table.
	 * @param line {string}
	 */
	function (line = '') {
		let rowData = line.split(this.separator);
		rowData.pop(); // 'pop' removes empty string that always comes last
		if (Array.isArray(rowData) && rowData.length) {
			_rows.push(rowData.slice());
		}
	}
);

/**
 * @param _rows
 * @returns {function(): string}
 */
const toString = _rows => (
	/**
	 * Returns the table representation as a string.
	 * @returns {string}
	 */
	() => {
		let tableString = ''
		if (_rows.length) {
			tableString = TABLE_SYMBOLS.OPEN;
			for (const row of _rows) {
				tableString += TABLE_SYMBOLS.ROW_DELIMITER
				for (const value of row) {
					tableString += `${TABLE_SYMBOLS.DATA_START} ${value.toString().trim()}\n`;
				}
			}
			tableString += TABLE_SYMBOLS.CLOSE;
		}
		return tableString;
	}
);