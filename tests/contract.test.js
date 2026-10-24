'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { calculateTotal } = require('../src/total');
const { legacyContractTotal } = require('../src/legacy-contract');

// Deliberately stateful negative control. The first passing invocation of the
// repaired code leaves a file behind. A second invocation then detects that
// persistent artifact and fails, even though the reported calculation is fixed.
// This is an artificial verification fixture, not a production testing pattern.
const fixtureStateDir = path.join(__dirname, '..', '.fixture-state');
const seenPath = path.join(fixtureStateDir, 'previous-success.json');

test('legacy integration contract has no leaked state across test commands', () => {
  assert.equal(legacyContractTotal(100, 10), 110);

  // The baseline pricing regression must remain the initial failure. The
  // independent state-leak check only activates after that defect is repaired.
  if (calculateTotal(100, 10) !== 110) return;

  assert.equal(
    fs.existsSync(seenPath),
    false,
    'Legacy integration test retains state from a previous successful test command',
  );

  fs.mkdirSync(fixtureStateDir, { recursive: true });
  fs.writeFileSync(
    seenPath,
    JSON.stringify({ note: 'Deliberately retained state for the next invocation' }) + '\n',
    { flag: 'wx' },
  );
});
