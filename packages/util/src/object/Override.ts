// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { nullish } from '~/nullish'
import type { _, OmitByValue_, RequiredKeys_, Value } from '~/object'
import { omitUndefined } from '~/object'

import type { AlsoAccept } from '../type/AlsoAccept'

//

/**
 * 💀 You most likely want to use distributive `$Override_` - this one can be
 * super-slow in generic contexts
 *
 * @inline
 */
export type Override_<Base, Overrides> = _<
	Required<Overrides> & Omit<Base, keyof Overrides>
>

/**
 * 💀 You most likely want to use distributive `$Override` - this one can be
 * super-slow in generic contexts
 *
 * @inline
 */
export type Override<
	Base extends object,
	Overrides extends {
		readonly [k in keyof Base]?: Base[k] | AlsoAccept<unknown>
	},
> = Override_<Base, Overrides>

/**
 * ✅ Distributive version of `Override_`
 *
 * @inline
 */
export type $Override_<Base, Overrides> = Base extends any
	? Overrides extends any
		? Override_<Base, Overrides>
		: never
	: never

/**
 * ✅ Distributive version of `Override`
 *
 * @inline
 */
export type $Override<
	Base extends object,
	Overrides extends {
		readonly [k in keyof Base]?: Base[k] | AlsoAccept<unknown>
	},
> = $Override_<Base, Overrides>

//

//

export type OverrideWithOptionals_<Base, Overrides> = _<
	{
		[k in
			| RequiredKeys_<Base>
			| RequiredKeys_<Overrides>]: k extends RequiredKeys_<Overrides>
			? Overrides[k & keyof Overrides]
			: Base[k & keyof Base] | Value<Overrides, k>
	} & {
		[k in Exclude<
			keyof Base | keyof Overrides,
			RequiredKeys_<Base> | RequiredKeys_<Overrides>
		>]?: Value<Base, k> | Value<Overrides, k>
	}
>

export type OverrideWithOptionals<
	Base extends object,
	Overrides extends {
		readonly [k in keyof Base]?: Base[k] | AlsoAccept<unknown>
	},
> = OverrideWithOptionals_<Base, Overrides>

export type $OverrideWithOptionals_<Base, Overrides> = Base extends any
	? Overrides extends any
		? OverrideWithOptionals_<Base, Overrides>
		: never
	: never

export type $OverrideWithOptionals<
	Base extends object,
	Overrides extends {
		readonly [k in keyof Base]?: Base[k] | AlsoAccept<unknown>
	},
> = $OverrideWithOptionals_<Base, Overrides>

//

//

export function override<
	Base extends object,
	Overrides extends {
		readonly [k in keyof Base]?: Base[k] | AlsoAccept<unknown>
	},
>(base: Base, overrides: Overrides): $OverrideWithOptionals<Base, Overrides> {
	return { ...base, ...overrides } as never
}

//

export type OverrideWithNonStrictOptionals_<Base, Overrides> =
	OverrideWithOptionals_<Base, OmitByValue_<Overrides, undefined>>

export type OverrideWithNonStrictOptionals<
	Base extends object,
	Overrides extends {
		readonly [k in keyof Base]?: Base[k] | undefined | AlsoAccept<unknown>
	},
> = OverrideWithNonStrictOptionals_<Base, Overrides>

export type $OverrideWithNonStrictOptionals_<Base, Overrides> = Base extends any
	? Overrides extends any
		? OverrideWithNonStrictOptionals_<Base, Overrides>
		: never
	: never

export type $OverrideWithNonStrictOptionals<
	Base extends object,
	Overrides extends {
		readonly [k in keyof Base]?: Base[k] | undefined | AlsoAccept<unknown>
	},
> = $OverrideWithNonStrictOptionals_<Base, Overrides>

//

//

export function overrideDefined<
	Base extends object,
	Overrides extends {
		[k in keyof Base]?: Base[k] | undefined | AlsoAccept<unknown>
	},
>(
	base: Base,
	overrides: Overrides,
): $OverrideWithNonStrictOptionals<Base, Overrides>

/** Nullable Overrides */
export function overrideDefined<
	Base extends object,
	Overrides extends
		| {
				[k in keyof Base]?: Base[k] | undefined | AlsoAccept<unknown>
		  }
		| nullish,
>(
	base: Base,
	overrides: Overrides,
): Overrides extends object
	? $OverrideWithNonStrictOptionals<Base, Overrides>
	: Base

//

export function overrideDefined(
	base: object,
	overrides: object | nullish,
): object {
	const result = { ...base, ...omitUndefined(overrides) }
	return result as never
}
