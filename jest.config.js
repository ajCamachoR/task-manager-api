const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...require("ts-jest").createDefaultPreset().transform,
  },
  // Uncomment below if you add a setup file:
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
