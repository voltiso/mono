// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeleteIt } from './deleteIt'
import { isDeleteIt } from './deleteIt'
import type { ReplaceIt } from './replaceIt'
import { isReplaceIt } from './replaceIt'

type PatchSentinel = DeleteIt | ReplaceIt

export function isPatchSentinel(x: unknown): x is PatchSentinel {
	return isDeleteIt(x) || isReplaceIt(x)
}
