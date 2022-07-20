import { forcePatch } from "./patch.js";
import { replaceIt } from "./replaceIt.js";
import { isPatchSentinel } from "./Sentinel.js";

/**
 * Similar to `patch`, but performs shallow merge by default
 */
export function patchSet<Obj extends object, PatchValue extends Obj>(
	x: Obj,
	patchValue: PatchValue
): PatchValue {
	const finalPatch = isPatchSentinel(patchValue)
		? patchValue
		: replaceIt(patchValue);

	return forcePatch(x, finalPatch) as never;
}
