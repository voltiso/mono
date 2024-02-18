// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SyncerPromise } from './SyncerPromise'

export interface SyncerFunction<
	Args extends unknown[] = never[],
	Return = unknown,
	Intermediate = unknown,
> {
	(...args: Args): SyncerPromise<Return, Intermediate>
}
