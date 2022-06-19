// eslint-disable-next-line jest/no-jest-import
import type { Config } from 'jest'

const config: Config = {
	transform: {
		'\\.ts$': '@voltiso/config.jest.esr/transform',
	},
	// testEnvironment: 'node',
	modulePathIgnorePatterns: ['^/dist/'],
}

export = config
