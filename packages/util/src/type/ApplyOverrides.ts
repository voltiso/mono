// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Reverse_ } from '~/object'

import type { AlsoAccept } from './AlsoAccept'

export type ApplyOverrides<
	Base,
	Overrides extends Partial<Base> | AlsoAccept<unknown>,
> = Merge2Reverse_<Overrides, Base>
