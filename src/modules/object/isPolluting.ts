/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Check if `obj[key]` is not causing Prototype Pollution
 * https://github.com/substack/minimist/blob/7efb22a518b53b06f5b02a1038a88bd6290c2846/index.js#L247
 * @param obj object
 * @param key keyof obj
 * @returns
 */
export function isPolluting(
	obj: object,
	p: keyof any
): p is 'constructor' | '__proto__' {
	return (
		(p === 'constructor' && typeof obj[p] === 'function') || p === '__proto__'
	)
}

export function assertNotPolluting(obj: object, p: keyof any) {
	if (isPolluting(obj, p))
		throw new Error(`Prototype pollution ${obj.toString()}.${p}`)
}
