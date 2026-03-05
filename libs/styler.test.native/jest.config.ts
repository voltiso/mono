import type { Config } from 'jest'

const config: Config = {
	preset: 'react-native',
	testEnvironment: 'node',
	// ! We transform too much - entire `.pnpm` directory
	transformIgnorePatterns: [
		'node_modules/(?!.pnpm|(jest-)?react-native|@react-native|@react-native-community|@react-navigation)',
	],
	moduleNameMapper: {
		'^@babel/runtime/(.*)$': '<rootDir>/node_modules/@babel/runtime/$1',
	},
}

export default config
