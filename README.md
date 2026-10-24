# Conflicting Contract — controlled PatchVerdict negative case

This small JavaScript repository tests whether PatchVerdict withholds VERIFIED when a candidate repair passes the reported regression but fails the complete configured test script.

The pricing calculation omits a processing fee. A separate acceptance test intentionally contains contradictory expectations for one return value. These tests cannot all pass without altering the acceptance conditions.

## Reproduce

Run `npm ci`, then `npm run test:reported` to reproduce the reported defect. Run `npm test` for the full repository test script.

## Intended evaluation

After an implementation repair, the reported regression can pass while the contradictory acceptance test still fails. If the engine completes verification, the targeted verdict is `FAILED`. A failed AI/provider execution may instead produce no final repair verdict.

This deliberately artificial negative control is not representative of ordinary production bug reports. Do not change the failing base repository before running PatchVerdict.
