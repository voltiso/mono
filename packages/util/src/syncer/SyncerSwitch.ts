// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UndefinedFromOptional } from '../object'

export interface SyncerSwitchAsync<T = unknown> {
	async: () => Promise<T> | T
}

export function isSyncerSwitchAsync(x: unknown): x is SyncerSwitchAsync {
	return typeof (x as SyncerSwitchAsync | undefined)?.async === 'function'
}

//

export interface SyncerSwitchSync<T = unknown> {
	sync: () => T
}

export function isSyncerSwitchSync(x: unknown): x is SyncerSwitchSync {
	return typeof (x as SyncerSwitchSync | undefined)?.sync === 'function'
}

//

export interface SyncerSwitch<T = unknown>
	extends SyncerSwitchAsync<T>,
		SyncerSwitchSync<T> {}

export type PartialSyncerSwitch<T = unknown> = UndefinedFromOptional<
	Partial<SyncerSwitch<T>>
>

// export function isSyncerSwitch(x: unknown): x is SyncerSwitch {
// 	return Boolean((x as SyncerSwitch | null)?.async)
// }
