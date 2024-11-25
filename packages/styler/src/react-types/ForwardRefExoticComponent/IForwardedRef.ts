// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable } from '@voltiso/util'

export interface IMutableRefObject {
	current: unknown
}

export type IForwardedRef =
	// eslint-disable-next-line sonarjs/no-redundant-type-constituents
	| BivariantCallable<(instance: unknown | null) => void>
	| IMutableRefObject
	| null
