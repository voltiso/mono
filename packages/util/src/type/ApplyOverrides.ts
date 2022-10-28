// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Reverse_ } from '~/object'

import type { AlsoAccept } from './AlsoAccept'

export type Override<
	Base extends object,
	Overrides extends Partial<Base> | AlsoAccept<unknown>,
> = Base extends any
	? Overrides extends any
		? Merge2Reverse_<Required<Overrides>, Base>
		: never
	: never
