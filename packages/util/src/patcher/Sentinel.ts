// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isArraySetUpdateIt } from '.'
import type { DeleteIt } from './deleteIt'
import { isDeleteIt } from './deleteIt'
import type { IncrementIt } from './incrementIt'
import { isIncrementIt } from './incrementIt'
import type { KeepIt } from './keepIt'
import { isKeepIt } from './keepIt'
import type { ReplaceIt } from './replaceIt'
import { isReplaceIt } from './replaceIt'

export type PatchSentinel = DeleteIt | ReplaceIt | KeepIt | IncrementIt

export function isPatchSentinel(x: unknown): x is PatchSentinel {
	return (
		isDeleteIt(x) ||
		isReplaceIt(x) ||
		isKeepIt(x) ||
		isIncrementIt(x) ||
		isArraySetUpdateIt(x)
	)
}
