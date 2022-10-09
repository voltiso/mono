// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedData } from '~/Data'
import type { IntrinsicFields } from '~/schemas'

import type { DeleteIt } from './DeleteIt'
import type { IncrementIt } from './IncrementIt'
import type { ReplaceIt } from './ReplaceIt'

export type NestedReplaceIt = ReplaceIt<NestedData>
export type RootReplaceIt = ReplaceIt<IntrinsicFields>

export type NestedIt = NestedReplaceIt | DeleteIt | IncrementIt
export type RootIt = RootReplaceIt | DeleteIt
