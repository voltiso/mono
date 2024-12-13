// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable } from '@voltiso/util'

export interface IMutableRefObject {
	current: unknown
}

export type IForwardedRef =
	| BivariantCallable<(instance: unknown | null) => void>
	| IMutableRefObject
	| null
