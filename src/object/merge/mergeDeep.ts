/* eslint-disable @typescript-eslint/ban-types */
type MergeDeepII<a, b> = a extends object
	? b extends object
		? {
				[k in keyof a | keyof b]: k extends keyof a & keyof b
					? MergeDeepII<a[k], b[k]>
					: k extends keyof a
					? a[k]
					: k extends keyof b
					? b[k]
					: never
		  }
		: b
	: b

type MergeDeepI<acc, objs> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? MergeDeepI<MergeDeepII<acc, h>, t>
		: [h] extends [never]
		? MergeDeepI<acc, t>
		: acc
	: acc

export type MergeDeep<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]] ? void : object | void = void,
	C extends [A] extends [readonly object[]] ? void : object | void = void,
	D extends [A] extends [readonly object[]] ? void : object | void = void,
	E extends [A] extends [readonly object[]] ? void : object | void = void
> = [A] extends [readonly object[]] ? MergeDeepI<{}, A> : MergeDeepI<{}, readonly [A, B, C, D, E]>

type RSU = Record<string, Object>

function mergeDeepI(a: RSU, b: RSU) {
	const r = { ...a }
	for (const k in b) {
		if (r[k]?.constructor === Object && b[k]?.constructor === Object) r[k] = mergeDeepI(r[k] as RSU, b[k] as RSU)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		else (r[k] as any) = b[k]
	}
	return r
}

export function mergeDeep<Objs extends readonly object[]>(...objs: Objs): MergeDeep<Objs> {
	let r = {}
	for (const obj of objs) {
		r = mergeDeepI(r, obj as RSU)
	}
	return r as MergeDeep<Objs>
}
