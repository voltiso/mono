/**
 * Decorator for classes to type-check static fields
 * https://stackoverflow.com/a/43674389/1123898
 */
export function staticImplements<Constructor>() {
	return <C extends Constructor>(_: C) => {}
}
