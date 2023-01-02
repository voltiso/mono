// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '~/Schemable/Schemable'

import type { Unknown } from '../unknown/Unknown'

export interface Rest<S extends $$Schemable = $$Schemable> {
	readonly element: S
}

export interface UnknownRest extends Rest<Unknown> {
	readonly element: Unknown
	<S extends $$Schemable>(element: S): Rest<S>
}
