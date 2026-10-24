'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateTotal } = require('../src/total');

test('reported total includes the processing fee', () => {
  assert.equal(calculateTotal(100, 10), 110);
});

test('zero fee keeps the original subtotal', () => {
  assert.equal(calculateTotal(40, 0), 40);
});
