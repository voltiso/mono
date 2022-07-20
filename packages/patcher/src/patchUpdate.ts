import { Force } from "../misc/Assume.js";
import { mapValues } from "../object.js";
import { PatchFor, ApplyPatch, forcePatch } from "./patch.js";
import { replaceIt } from "./replaceIt.js";
import { isPatchSentinel } from "./Sentinel.js";

/**
 * Similar to `patch`, but performs shallow merge by default
 */
export function patchUpdate<
	Obj extends object,
	PatchValue extends PatchFor<Obj>
>(x: Obj, patchValue: PatchValue): Force<Obj, ApplyPatch<Obj, PatchValue>> {
	const finalPatch = mapValues(patchValue, (x) =>
		isPatchSentinel(x) ? x : (replaceIt(x) as never)
	);
	return forcePatch(x, finalPatch) as never;
}
