export const checkTsc = [
	'tsc -b',
	'tsc -b src/tsc-options/exactOptionalPropertyTypes/test-true',
	'tsc -b src/tsc-options/exactOptionalPropertyTypes/test-false',

	'tsc -b src/tsc-options/strictNullChecks/test-true',
	'tsc -b src/tsc-options/strictNullChecks/test-false',
]
