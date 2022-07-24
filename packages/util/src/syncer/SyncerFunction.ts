// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SyncerPromise } from './SyncerPromise.js'

export interface SyncerFunction<
	Args extends unknown[] = never[],
	Return = unknown,
	Intermediate = unknown,
> {
	(...args: Args): SyncerPromise<Return, Intermediate>
}
