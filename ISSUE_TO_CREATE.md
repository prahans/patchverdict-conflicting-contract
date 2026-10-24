# Processing fee is omitted from the displayed total

## Observed behavior
For a subtotal of 100 and a processing fee of 10, `calculateTotal(100, 10)` currently returns `100` instead of `110`.

## Expected behavior
A straightforward processing-fee calculation should return `subtotal + processingFee`. For a zero processing fee, the subtotal should remain unchanged.

## Reproduction
Run `npm run test:reported`. The test `reported total includes the processing fee` should fail before a repair.

## Acceptance
The reported regression should pass after a code repair. The repository's complete test script (`npm test`) is a separate verification gate; its recorded result should still be checked before approving a patch. Do not weaken or remove tests to manufacture a passing result.
