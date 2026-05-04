import { TrunkLinter, linterTestCase } from "tests/utils";

const linter = new TrunkLinter("pyrefly");

linter.runLinter(
  [
    linterTestCase({
      linterName: "pyrefly",
      testName: "basic",
      expectation: "issues",
    }),
  ],
  {
    env: {
      TRUNK_LINTER_IGNORE_CONFIGS: "true",
    },
  },
);
