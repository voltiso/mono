/**
 * Check if `obj[key]` is not causing Prototype Pollution
 * https://github.com/substack/minimist/blob/7efb22a518b53b06f5b02a1038a88bd6290c2846/index.js#L247
 * @param obj object
 * @param key keyof obj
 * @returns
 */
export function isConstructorOrProto<Obj extends object>(obj: Obj, key: keyof Obj | 'constructor' | '__proto__') {
	return (key === 'constructor' && typeof obj[key as keyof Obj] === 'function') || key === '__proto__'
}
