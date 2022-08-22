// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PartialIntrinsicFields } from '~'
import type { NestedData } from '~/Data'

import type { DeleteIt } from './DeleteIt'
import type { IncrementIt } from './IncrementIt'
import type { ReplaceIt } from './ReplaceIt'

export type NestedReplaceIt = ReplaceIt<NestedData>
export type RootReplaceIt = ReplaceIt<PartialIntrinsicFields>

export type NestedIt = NestedReplaceIt | DeleteIt | IncrementIt
export type RootIt = RootReplaceIt | DeleteIt
