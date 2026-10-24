# Conflicting Contract — stateful verification negative control

This is a **deliberately artificial PatchVerdict fixture**, designed to show that a candidate repair can pass the configured reproduction and still receive a **FAILED repair verdict** if a later verification command fails.

The repository keeps its original processing-fee bug in `src/total.js`: `calculateTotal(100, 10)` returns `100` instead of `110`.

An independent legacy integration test in `tests/contract.test.js` deliberately leaks state across repeated test commands. When the reported processing-fee defect is still present, this check is inactive. Once the fee is fixed, the first successful test command leaves an ignored marker under `.fixture-state/`. The next invocation detects it and fails.

**This stateful test is a demonstration mechanism, not a recommended production testing pattern or evidence about general repair accuracy.** The same `npm test` command can intentionally produce different results across sequential invocations.

## Run with PatchVerdict

1. Submit [GitHub Issue #1](https://github.com/prahans/patchverdict-conflicting-contract/issues/1) (or enter the repository and bug manually).
2. **Leave all Advanced Verification Settings empty.** The default reproduction command is `npm test`.
3. Confirm the mission uses this repository's current `main` base commit.
4. Inspect the saved execution and repair verdict separately.

If PatchVerdict successfully applies the intended production repair:

| Stage | Command | Intended result |
| --- | --- | --- |
| Baseline before patch | `npm test` | FAIL: reported fee regression |
| Post-patch reproduction | `npm test` | PASS: reported bug fixed, state marker newly written |
| Later verification command | `npm test` | FAIL: legacy integration test detects retained marker |

The expected completed outcome is **execution `COMPLETED` / repair verdict `FAILED`**.

The AI is not deterministic. It may fail investigation or patch generation, or attempt a different repair; in that case execution may be `FAILED` and the repair verdict `UNAVAILABLE`. This fixture cannot guarantee a completed mission.

## Local development and inspection

```bash
npm ci
npm test
```

To simulate the intended repair locally, temporarily edit `src/total.js` to return `subtotal + processingFee`, then run `npm test` twice. The first invocation after repair should pass; the next should fail on the retained-state test. Restore the original source before using it as a fresh baseline. A fresh PatchVerdict E2B sandbox starts without a marker.

To reset the local fixture, remove the ignored `.fixture-state/` directory. Do not commit an already repaired `src/total.js` to the GitHub fixture.

## What this does not prove

It does not establish general repair failure rates, validity of real-world test suites, or the trustworthiness of a given AI model. The stateful nature of the fixture is intentional and must be disclosed when presenting results.
