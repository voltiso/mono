import type { UndefinedFromOptional } from '@voltiso/util.type'

export type SyncerSwitch<T = unknown> = {
	sync: () => T
	async: () => Promise<T> | T
}

export type PartialSyncerSwitch<T = unknown> = UndefinedFromOptional<
	Partial<SyncerSwitch<T>>
>

// export function isSyncerSwitch(x: unknown): x is SyncerSwitch {
// 	return Boolean((x as SyncerSwitch | null)?.async)
// }
