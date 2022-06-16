import { forcePatch } from './patch'
import { replaceIt } from './replaceIt'
import { isPatchSentinel } from './Sentinel'

/**
 * Similar to `patch`, but performs shallow merge by default
 */
export function patchSet<Obj extends object, PatchValue extends Obj>(
	x: Obj,
	patchValue: PatchValue
): PatchValue {
	const finalPatch = isPatchSentinel(patchValue)
		? patchValue
		: replaceIt(patchValue)

	return forcePatch(x, finalPatch) as never
}
