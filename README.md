# THE 0.60% ANOMALY — Training Edition

A guided scientific investigation for high-school learners. No prior nuclear-physics knowledge or calculations are required. Six short lessons lead from an unusual measurement to an evidence-supported explanation. A separate, optional activity explores the later 2004 discovery.

## Play

Unzip the package, then open **PLAY.html** in a modern browser. This is the whole game in one file. No installation, account, backend or network is required.

Alternatively, open `index.html` with the other source files beside it. For consistent browser save behavior, you can run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

## What changed in the training edition

- A clearly marked next task appears in every lesson.
- Technical words are explained beside the experiment, with a notebook glossary.
- Instrument alignment and measurement timing are handled automatically.
- Isotope measurements are automatically converted into percentages.
- Geology has only two choices: time period and water present/absent.
- Both heat-and-water experiments stop and save automatically.
- Report evidence is shown beside each claim; citations are automatic.
- Wrong interpretations get feedback and can be revised without penalty.
- Hypothesis notes and the 2004 bonus are optional.
- The optional bonus has only two sliders; technical retention assumptions are fixed.

## The six lessons

1. Calibrate, measure the known sample, measure the Gabon sample, compare.
2. Repeat the measurements, test unprocessed ore, inspect the sample record.
3. Compare two measured isotope fingerprints with possible explanations.
4. Test the same rock today and long ago, with and without water.
5. Watch and compare two water/heat experiments.
6. Build five evidence-supported sentences to explain the discovery.

Use **Explain my task** whenever you want explicit instructions. Completed lessons remain available to revisit. The notebook records results automatically. “My ideas” is an optional place to revise hypotheses and connect evidence.

## Saving

Progress autosaves to this browser. **Save** creates a separate manual checkpoint and **Load** restores it. Export/import transfers a training save as JSON. Restart replaces autosave but keeps the manual checkpoint. Local-file storage varies by browser; use exported saves if needed.

The training edition uses new save keys and does not overwrite old expert-edition progress. Old version-1 saves are not compatible with this redesigned lesson sequence. A currently running experiment is saved only when it finishes; leaving the lesson pauses it and you can rerun it.

## Source and tests

- `PLAY.html`: standalone playable edition.
- `index.html`, `style.css`, `app.js`: editable interface and progression.
- `models.js`: scientific calculations, separate from the interface.
- `SCIENCE.md`: detailed source notes and model limits; optional, contains spoilers.
- `build.py`: regenerate PLAY.html with `python3 build.py`.
- `test-models.cjs`: run `node test-models.cjs`.
- `test-workflow.cjs`: run `node test-workflow.cjs`; dependency-free event-handler and progression test.
- `test-browser.cjs`: optional Playwright browser walkthrough; install instructions are at the top of the file.

## Verification and limits

Model tests and the complete guided workflow passed, including incorrect answers, mismatched isotope patterns, report checks, automatic simulation stopping, recorded graph review, notes, evidence links, manual load and restart. JavaScript syntax was checked.

Real-browser visual QA remains unverified: Chromium was unavailable in the build environment and its download was blocked. The lightweight workflow harness does not verify rendered layout. Target age appropriateness is an instructional design choice, not a result of classroom playtesting.

All sample data and certificates are simulated. Some equations use real physical relationships; others are explicitly reduced teaching models. The 2004 activity uses invented proxy clocks and a synthetic target, not real measured xenon ratios. No data are sent to a server. Source links open only if clicked.

## Opening briefing
This edition opens with a spoiler-conscious introduction, plain-language science primer, instructions, and optional DOE and NASA resources. Select Begin (or Continue) to enter. Reopen it with Briefing & resources. Existing training saves are compatible. External reading needs internet; gameplay does not.
