// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SyncerPromise } from './SyncerPromise'

export interface SyncerFunction<
	Args extends unknown[] = never[],
	Return = unknown,
	Intermediate = unknown,
> {
	// biome-ignore lint/style/useShorthandFunctionType: .
	(...args: Args): SyncerPromise<Return, Intermediate>
}
