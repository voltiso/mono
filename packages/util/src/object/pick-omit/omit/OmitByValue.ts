// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isSet } from '~/map-set'
import type { Value } from '~/object'
import type { AlsoAccept } from '~/type'

export type OmitByValue<
	Obj extends object,
	val extends Value<Obj> | AlsoAccept<unknown>,
> = OmitByValue_<Obj, val>

export type OmitByValue_<Obj, val> = Omit<
	Obj,
	{
		[k in keyof Obj]: Value<Obj, k> extends val ? k : never
	}[keyof Obj]
>

export function omitByValue<Obj extends object, Val>(
	obj: Obj,
	valuesToOmit: Iterable<Val>,
): OmitByValue<Obj, Val> {
	const valuesSet = isSet(valuesToOmit) ? valuesToOmit : new Set(valuesToOmit)

	const result: any = {}

	let haveChange = false

	for (const [key, value] of Object.entries(obj)) {
		if (valuesSet.has(value)) {
			haveChange = true
			continue
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
		result[key] = value
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return haveChange ? result : obj
}

export function omitUndefined<Obj extends object>(
	obj: Obj,
): OmitByValue<Obj, undefined> {
	return omitByValue(obj, [undefined])
}

export function omitNull<Obj extends object>(obj: Obj): OmitByValue<Obj, null> {
	return omitByValue(obj, [null])
}

export function omitUndefinedAndNull<Obj extends object>(
	obj: Obj,
): OmitByValue<Obj, undefined | null> {
	return omitByValue(obj, [undefined, null])
}
