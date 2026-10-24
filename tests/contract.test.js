'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { legacyContractTotal } = require('../src/legacy-contract');

// Independent legacy integration fixture. The two assertions intentionally
// encode incompatible expectations for the same output; this is a negative control.
test('legacy integration contract has incompatible acceptance rules', () => {
  const observed = legacyContractTotal(100, 10);
  assert.equal(observed, 110, 'posted amount with processing fee');
  assert.equal(observed, 105, 'legacy integration expects a different fixed amount');
});
