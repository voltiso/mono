// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFrom } from '~/string'

import type { ArraySetUpdateIt } from './arraySetUpdateIt'
import { isArraySetUpdateIt } from './arraySetUpdateIt'
import type { DeleteIt, DeleteItIfPresent } from './deleteIt'
import { isDeleteIt, isDeleteItIfPresent } from './deleteIt'
import type { IncrementIt } from './incrementIt'
import { isIncrementIt } from './incrementIt'
import type { KeepIt, KeepItIfPresent } from './keepIt'
import { isKeepIt, isKeepItIfPresent } from './keepIt'
import type { ReplaceIt } from './replaceIt'
import { isReplaceIt } from './replaceIt'

export type PatchSentinel =
	| DeleteIt
	| DeleteItIfPresent
	| ReplaceIt
	| KeepIt
	| KeepItIfPresent
	| IncrementIt
	| ArraySetUpdateIt

export namespace PatchSentinel {
	/** Safe to ignore if source value does not exist */
	export type SafeToStrip = DeleteItIfPresent | KeepItIfPresent
}

export function isSafeToStripPatchSentinel(
	x: unknown,
): x is PatchSentinel.SafeToStrip {
	return isDeleteItIfPresent(x) || isKeepItIfPresent(x)
}

export function isPatchSentinel(x: unknown): x is PatchSentinel {
	return (
		isDeleteIt(x) ||
		isDeleteItIfPresent(x) ||
		isReplaceIt(x) ||
		isKeepIt(x) ||
		isKeepItIfPresent(x) ||
		isIncrementIt(x) ||
		isArraySetUpdateIt(x)
	)
}

export function stringFromPatchSentinel(x: PatchSentinel): string {
	if (isDeleteIt(x)) return 'deleteIt'
	if (isDeleteItIfPresent(x)) return 'deleteItIfPresent'
	if (isReplaceIt(x)) return `replaceIt(${stringFrom(x.__replaceIt)})`
	if (isKeepIt(x)) return 'keepIt'
	if (isKeepItIfPresent(x)) return 'keepItIfPresent'
	if (isIncrementIt(x)) return `incrementIt(${x.__incrementIt})`

	if (isArraySetUpdateIt(x))
		return `arraySetUpdateIt(${stringFrom(x.__arraySetUpdateIt)})`

	throw new TypeError(
		`stringFromPatchSentinel: invalid sentinel ${stringFrom(x)}`,
	)
}
