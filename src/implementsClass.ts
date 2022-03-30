/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Decorator for classes to type-check static fields
 * https://stackoverflow.com/a/43674389/1123898
 */
export function implementsClass<Constructor>() {
	return <C extends Constructor>(_: C) => {}
}
