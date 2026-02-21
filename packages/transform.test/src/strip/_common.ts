/** @strip */
export function $expect(_value: unknown) {
	return {
		toStrictEqual: (_expected: unknown) => {},
		toBeTruthy: () => {},
	}
}
