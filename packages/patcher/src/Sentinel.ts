// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeleteIt } from './deleteIt.js'
import { isDeleteIt } from './deleteIt.js'
import type { ReplaceIt } from './replaceIt.js'
import { isReplaceIt } from './replaceIt.js'

type PatchSentinel = DeleteIt | ReplaceIt

export function isPatchSentinel(x: unknown): x is PatchSentinel {
	return isDeleteIt(x) || isReplaceIt(x)
}
