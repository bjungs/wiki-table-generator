'use strict';

const TABLE_SYMBOLS = Object.freeze({
	OPEN: '{|\n',
	CLOSE: '|}',
	ROW_DELIMITER: '|-\n',
	DATA_START: '|'
});

const UNSUPPORTED_CHARACTERS_ESCAPED = {
	'|': '&#124;'
}

/**
 * Returns a new empty table object.
 * @returns {object} {
 *     getRows: {function}: returns a copy of the current rows array,
 *     insertRow: {function(string)}: inserts a new row into the table,
 *     toString: {function}: stringifies the table into Wiki format,
 *     separator: {RegExp}: RegExp object to separate the line into header and data
 * }
 */
module.exports.create = (separator = ':') => {
	let _rows = [];
	_rows.maxColumns = 0;
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
			value: separator
		}
	});
}

/**
 * @param _rows
 * @returns {function(): undefined}
 */
const insertRow = _rows => {
	/**
	 * Inserts a row at the end of the table.
	 * @param line {string|string[]}
	 */
	return function (rowData = '') {
		if (typeof rowData === 'string') {
			rowData = rowData.split(this.separator);
		}
		_rows.maxColumns = Math.max(_rows.maxColumns, rowData.length);
		if (Array.isArray(rowData) && rowData.length) {
			_rows.push(rowData.slice());
		}
	}
};

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
				for (let line = 0; line < _rows.maxColumns; line++) {
					const lineString = row[line] ? row[line].toString().trim() : '';
					tableString += `${TABLE_SYMBOLS.DATA_START} ${escapeUnsupportedCharacters(lineString)}\n`;
				}
			}
			tableString += TABLE_SYMBOLS.CLOSE;
		}
		return tableString;
	}
);

const escapeUnsupportedCharacters = text => {
	for (let char in UNSUPPORTED_CHARACTERS_ESCAPED) {
		const replacementRegex = new RegExp(`[${char}]`, 'gi');
		text = text.replace(replacementRegex, UNSUPPORTED_CHARACTERS_ESCAPED[char]);
	}
	return text;
}