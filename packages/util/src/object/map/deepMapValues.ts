// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable, Parameters_, Return_ } from '~/function'

export type DeepMapValues_<TObject, TMapping> =
	TObject extends Parameters_<TMapping>[0]
		? Return_<TMapping>
		: {
				[k in keyof TObject]: DeepMapValues_<TObject[k], TMapping>
		  }

export function deepMapValues<
	TObject,
	TMapping extends BivariantCallable<
		(arg: unknown, path: /* Path<TObject>*/ (keyof any)[]) => unknown
	>,
>(
	object: TObject,
	mapping: TMapping,
	pathPrefix: (string | number)[] = [],
): DeepMapValues_<TObject, TMapping> {
	if (Array.isArray(object)) {
		return object.map((x, idx) =>
			deepMapValues(x as never, mapping, [...pathPrefix, idx]),
		) as never
	} else if (typeof object === 'object' && object !== null)
		return Object.fromEntries(
			Object.entries(object as never).map(([key, value]) => [
				key,
				deepMapValues(value, mapping, [...pathPrefix, key]),
			]),
		) as never
	else return mapping(object, pathPrefix as never) as never
}
