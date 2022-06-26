import { testFiles } from '../files'

export const testingLibrary = {
	files: testFiles,

	plugins: ['testing-library'],

	extends: ['plugin:testing-library/react'],
}
