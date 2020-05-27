'use strict';

const TABLE_SYMBOLS = Object.freeze({
	OPEN: '{|\n',
	CLOSE: '|}',
	ROW_DELIMITER: '|-\n',
	DATA_START: '|'
});

module.exports.create = () => {
	let _rows = [];
	return Object.defineProperties({}, {
		rows: {
			get: () => Object.freeze(_rows.slice())
		},
		insertRow: {
			value: insertRow(_rows)
		},
		toString: {
			value: toString(_rows)
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
	 * @param rowData
	 */
	(rowData = []) => {
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
					tableString += `${TABLE_SYMBOLS.DATA_START} ${value.trim()}\n`;
				}
			}
			tableString += TABLE_SYMBOLS.CLOSE;
		}
		return tableString;
	}
);