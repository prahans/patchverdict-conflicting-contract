'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { calculateTotal } = require('../src/total');

// Negative-control fixture: two contradictory requirements for one recorded value.
// A single primitive number cannot be strictly equal to both 110 and 105.
test('conflicting contract expectations cannot both pass', () => {
  const observed = calculateTotal(100, 10);
  assert.equal(observed, 110, 'The posted processing fee must be included');
  assert.equal(observed, 105, 'The separate legacy contract demands a conflicting total');
});
