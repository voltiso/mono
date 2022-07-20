// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SyncerIterator } from './SyncerIterator.js'

export interface SyncerFunction<
	Args extends unknown[] = never[],
	Return = unknown,
	Intermediate = unknown,
> {
	(...args: Args): SyncerIterator<Return, Intermediate>
}
