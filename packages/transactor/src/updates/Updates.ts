// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeleteIt } from '@voltiso/util'

import type { NestedData } from '~/Data/Data'
import type { NestedIt, RootReplaceIt } from '~/it'

export interface UpdatesRecord {
	id?: never
	[k: string]: NestedUpdates
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface NestedUpdatesRecord {
	[k: string]: NestedUpdates
}
export type NestedUpdates = NestedData | NestedUpdatesRecord | NestedIt

export type Updates = UpdatesRecord | RootReplaceIt | DeleteIt
