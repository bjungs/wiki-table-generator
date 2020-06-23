'use strict';

const assert = require('assert');
const tableFactory = require('../lib/TableFactory');

describe('TableFactory', () => {
	describe('Immutability', () => {
		let table = tableFactory.create();
		it('immutable properties', done => {
			for (const prop in table) {
				try {
					table[prop] = 'test';
					done(`Property ${prop} is not immutable`);
				} catch {}
			}
			done();
		});
	});
	describe('insertRow', () => {
		let table = tableFactory.create();
		const rowData = ['Column1', 'Column2', 'Column3'];
		it('Inserting data', done => {
			table.insertRow(rowData);
			assert.strictEqual(table.getRows().length, 1);
			table.insertRow(rowData);
			assert.strictEqual(table.getRows().length, 2);
			done();
		});
	});
	describe('toString', () => {
		let table = tableFactory.create();
		it('Converting data to String', done => {
			table.insertRow([1, 2]);
			table.insertRow(['test', 'testing...']);
			table.insertRow([5, 6]);
			assert.strictEqual(table.toString(), '{|\n' +
				'|-\n' +
				`| ${table.getRows()[0][0].toString()}\n` +
				`| ${table.getRows()[0][1].toString()}\n` +
				'|-\n' +
				`| ${table.getRows()[1][0].toString()}\n` +
				`| ${table.getRows()[1][1].toString()}\n` +
				'|-\n' +
				`| ${table.getRows()[2][0].toString()}\n` +
				`| ${table.getRows()[2][1].toString()}\n` +
				'|}');
			done();
		});
	});
	describe('column asymmetry', () => {
		let table = tableFactory.create();
		it('', done => {
			table.insertRow([1, 2])
			table.insertRow([3, 'test', 5, undefined]);
			table.insertRow([3, null, 5]);
			assert.strictEqual(table.toString(), '{|\n' +
				'|-\n' +
				`| ${table.getRows()[0][0].toString()}\n` +
				`| ${table.getRows()[0][1].toString()}\n` +
				'| \n' + // empty spaces where the missing values would be
				'| \n' +
				'|-\n' +
				`| ${table.getRows()[1][0].toString()}\n` +
				`| ${table.getRows()[1][1].toString()}\n` +
				`| ${table.getRows()[1][2].toString()}\n` +
				'| \n' +
				'|-\n' +
				`| ${table.getRows()[2][0].toString()}\n` +
				'| \n' +
				`| ${table.getRows()[2][2].toString()}\n` +
				'| \n' +
				'|}');
			done();
		});
	});
})