// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Reverse_, OmitValues } from '~/object'
import { assertNotPolluting } from '~/object'

import type { AlsoAccept } from './AlsoAccept'

export type Override<
	Base,
	Overrides extends Partial<Base> | AlsoAccept<unknown>,
> = Base extends any
	? Overrides extends any
		? Merge2Reverse_<Required<Overrides>, Base>
		: never
	: never

//

export type OverrideIfDefined<
	Base,
	Overrides extends Partial<Base> | undefined | AlsoAccept<unknown>,
> = Override<Base, OmitValues<Exclude<Overrides, undefined>, undefined>>

export function overrideIfDefined<
	Base,
	Overrides extends Partial<Base> | undefined | AlsoAccept<unknown>,
>(base: Base, overrides: Overrides): OverrideIfDefined<Base, Overrides> {
	const result = { ...base }

	for (const [key, value] of Object.entries(overrides || {})) {
		if (value === undefined) continue
		assertNotPolluting(key)
		result[key as never] = value as never
	}

	return result as never
}
