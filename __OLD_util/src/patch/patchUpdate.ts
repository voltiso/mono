import { Force } from '../misc/Assume'
import { mapValues } from '../object'
import { PatchFor, ApplyPatch, forcePatch } from './patch'
import { replaceIt } from './replaceIt'
import { isPatchSentinel } from './Sentinel'

/**
 * Similar to `patch`, but performs shallow merge by default
 */
export function patchUpdate<
	Obj extends object,
	PatchValue extends PatchFor<Obj>
>(x: Obj, patchValue: PatchValue): Force<Obj, ApplyPatch<Obj, PatchValue>> {
	const finalPatch = mapValues(patchValue, x =>
		isPatchSentinel(x) ? x : (replaceIt(x) as never)
	)
	return forcePatch(x, finalPatch) as never
}
