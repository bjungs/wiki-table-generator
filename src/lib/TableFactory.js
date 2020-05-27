'use strict';

const TABLE_SYMBOLS = Object.freeze({
	OPEN: '{|\n',
	CLOSE: '|}',
	ROW_DELIMITER: '|-\n',
	DATA_START: '|'
});

module.exports.create = () => {
	return Object.assign({}, {
		rows: [],
		insertRow,
		deleteRow,
		toString
	});
}

/**
 * Inserts a row at the position specified (defaults to the end of the table).
 * @param rowData
 * @param index
 */
const insertRow = function(rowData = [], index) {
	if (Array.isArray(rowData) && rowData.length) {
		let row = rowData.slice();
		if (!parseInt(index) || index < 0 || index >= this.rows.length) {
			index = this.rows.length - 1;
		}
		this.rows.splice(index, 0, row);
	}
}

const deleteRow = function(index) {
	if (parseInt(index) && this.rows[index]) {
		this.rows.splice(index, 1);
	}
}

const toString = function() {
	let tableString = TABLE_SYMBOLS.OPEN;
	for (const row of this.rows) {
		tableString += TABLE_SYMBOLS.ROW_DELIMITER
		for (const value of row) {
			tableString += `${TABLE_SYMBOLS.DATA_START} ${value.trim()}\n`;
		}
	}
	return tableString + TABLE_SYMBOLS.CLOSE;
}