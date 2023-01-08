// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeleteIt, IncrementIt, ReplaceIt } from '@voltiso/util'

import type { NestedData } from '~/Data'
import type { IntrinsicFields } from '~/schemas'

export type NestedReplaceIt = ReplaceIt<NestedData>
export type RootReplaceIt = ReplaceIt<IntrinsicFields>

export type NestedIt = NestedReplaceIt | DeleteIt | IncrementIt
export type RootIt = RootReplaceIt | DeleteIt
