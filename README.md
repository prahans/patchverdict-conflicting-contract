# Conflicting Contract — controlled PatchVerdict negative case

This small JavaScript repository tests whether PatchVerdict rejects a candidate when the **reported regression is fixed** but the **repository test script still fails**.

The fixture deliberately contains two independent problems:

1. **Reported processing-fee bug** (`src/total.js` and `tests/reported.test.js`): the calculation omits a fee. The issue requests a code repair in this implementation.
2. **Unrelated legacy-contract conflict** (`src/legacy-contract.js` and `tests/contract.test.js`): its acceptance assertions require incompatible totals from the same call. The contract test remains unsatisfied even after fixing the reported bug.

The legacy contract is isolated from the reported function so a legitimate candidate repair can satisfy the reported reproduction before PatchVerdict checks the full suite.

## Reproduction and verification

Run `npm ci`, then `npm run test:reported` to reproduce the reported bug. Run `npm test` for the entire test script.

When testing with PatchVerdict, supply `npm run test:reported` as the **Advanced → Reproduction command**. Leave the optional required-output marker empty.

| Stage | Reported reproduction | Repository test script |
| --- | --- | --- |
| Original checkout | Fails | Fails |
| After the intended `src/total.js` repair | Passes | Still fails (independent legacy-contract assertion) |

## Intended evaluation

If the investigator and patch agent successfully apply the expected code repair and the complete verification path finishes, the targeted result is **execution `COMPLETED` / repair verdict `FAILED`** because the separate repository test script remains failing.

AI tool use is not deterministic: a mission may stop early and show execution `FAILED` with no repair verdict. That is not a `FAILED` repair verdict.

This is an artificial negative control, **not** a measure of real-world bug-fixing accuracy. Do not change the failing base repository before running PatchVerdict.
