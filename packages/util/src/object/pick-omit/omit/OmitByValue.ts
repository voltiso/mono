// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isSet } from '~/map-set'
import type { nullish } from '~/nullish'
import type { _, Value } from '~/object'
import type { AlsoAccept } from '~/type'


export type OmitByValue_<Obj, val> = Omit<
	{
		[k in keyof Obj]: Exclude<Obj[k], val>
	},
	{
		[k in keyof Obj]: Value<Obj, k> extends val ? k : never
	}[keyof Obj]
>

export type OmitByValue<
	Obj extends object,
	val extends Value<Obj> | AlsoAccept<unknown>,
> = OmitByValue_<Obj, val>

//

export function omitByValue<O extends object, ValueToOmit>(
	obj: O,
	valuesToOmit: Iterable<ValueToOmit>,
): _<OmitByValue<O, ValueToOmit>>

export function omitByValue<T extends object | nullish, ValueToOmit>(
	obj: T,
	valuesToOmit: Iterable<ValueToOmit>,
): T extends object ? _<OmitByValue<T, ValueToOmit>> : T

//

export function omitByValue(
	obj: object | nullish,
	valuesToOmit: Iterable<unknown> | nullish,
): object | nullish {
	if (!obj) return obj

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

//

//

export function omitUndefined<O extends object>(
	obj: O,
): _<OmitByValue<O, undefined>>

export function omitUndefined<T extends object | nullish>(
	obj: T,
): T extends nullish
	? T
	: T extends object
	? _<OmitByValue<T, undefined>>
	: never

//

export function omitUndefined<O extends object>(
	obj: O | nullish,
): _<OmitByValue<O, undefined>> | nullish {
	return omitByValue(obj, [undefined]) as never
}

//

//

export function omitNull<O extends object>(obj: O): _<OmitByValue<O, null>>

export function omitNull<T extends object | nullish>(
	obj: T,
): T extends nullish ? T : T extends object ? _<OmitByValue<T, null>> : never

//

export function omitNull<O extends object>(
	obj: O | nullish,
): _<OmitByValue<O, null>> | nullish {
	return omitByValue(obj, [null]) as never
}

//

export function omitNullish<O extends object>(
	obj: O,
): _<OmitByValue<O, nullish>>

export function omitNullish<T extends object | nullish>(
	obj: T,
): T extends nullish ? T : T extends object ? _<OmitByValue<T, nullish>> : never

// null + undefined
export function omitNullish<O extends object>(
	obj: O | nullish,
): _<OmitByValue<O, nullish>> | nullish {
	return omitByValue(obj, [undefined, null]) as never
}
