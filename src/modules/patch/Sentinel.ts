import { DeleteIt, isDeleteIt } from './deleteIt'
import { isReplaceIt, ReplaceIt } from './replaceIt'

type PatchSentinel = DeleteIt | ReplaceIt

export function isPatchSentinel(x: unknown): x is PatchSentinel {
	return isDeleteIt(x) || isReplaceIt(x)
}
