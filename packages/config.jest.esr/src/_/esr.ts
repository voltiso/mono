import type { Config as JestConfig } from "jest";

const config = {
	transform: {
		"\\.ts$": "@voltiso/config.jest.esr/transform",
	},
	// testEnvironment: 'node',
	modulePathIgnorePatterns: ["^/dist/"],
} as const;

export type VoltisoJestEsrConfig = typeof config & JestConfig;
export default config as VoltisoJestEsrConfig;
