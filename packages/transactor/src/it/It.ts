// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DataWithoutId, NestedData } from '../Data'
import type { DeleteIt } from './DeleteIt.js'
import type { IncrementIt } from './IncrementIt.js'
import type { ReplaceIt } from './ReplaceIt.js'

export type NestedReplaceIt = ReplaceIt<NestedData>
export type RootReplaceIt = ReplaceIt<DataWithoutId>

export type NestedIt = NestedReplaceIt | DeleteIt | IncrementIt
export type RootIt = RootReplaceIt | DeleteIt
