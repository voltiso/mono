/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undefined */
import { AlsoAccept } from "../misc/AlsoAccept.js";
import { Force } from "../misc/Assume.js";
import {
	getEntries,
	isPlain,
	Merge2,
	setProperty,
	tryGetProperty,
	ValueImpl,
} from "../object";
import { DeleteIt, isDeleteIt } from "./deleteIt.js";
import { isReplaceIt, ReplaceIt } from "./replaceIt.js";

export type Patch = unknown;

//

export type PatchFor<X> =
	| (X extends object
			? {
					[key in keyof X]?: PatchFor<X[key]>;
			  }
			: never)
	| ReplaceIt<X>
	| (X extends undefined ? DeleteIt : never)
	| X;

//

export type ForcePatchFor<X> =
	| (X extends object
			? {
					[key in keyof X]?: ForcePatchFor<X[key]>;
			  }
			: never)
	| ReplaceIt<X | AlsoAccept<unknown>>
	| DeleteIt
	| X
	| AlsoAccept<unknown>;

//

type ApplyPatchSub<X, P> = {
	[key in keyof P]: ApplyPatch<ValueImpl<X, key>, P[key]>;
};

export type ApplyPatch<X, P extends ForcePatchFor<X>> = P extends DeleteIt
	? undefined
	: P extends ReplaceIt<infer R>
	? R
	: P extends object
	? X extends object
		? Merge2<X, ApplyPatchSub<X, P>>
		: ApplyPatchSub<X, P>
	: P;

//

export function forcePatch<X, PatchValue extends ForcePatchFor<X>>(
	x: X,
	patchValue: PatchValue
): ApplyPatch<X, PatchValue> {
	if (isDeleteIt(patchValue)) return undefined as never;
	else if (isReplaceIt(patchValue)) {
		// if (deps.isEqual(x, patchValue.__replaceIt)) return x
		// else
		return patchValue.__replaceIt as never;
	} else if (isPlain(patchValue)) {
		const res: any = { ...x };
		let haveChange = false;
		for (const [key, val] of getEntries(patchValue)) {
			const oldValue = tryGetProperty(res, key);
			const newValue = forcePatch(oldValue, val);
			if (newValue !== oldValue) {
				setProperty(res, key, newValue as any);
				haveChange = true;
			}
		}

		if (haveChange) return res as never;
		else return x as never;
	} else return patchValue as never;
}

//

export function patch<X, PatchValue extends PatchFor<X>>(
	x: X,
	patchValue: PatchValue
): Force<X, ApplyPatch<X, PatchValue>> {
	return forcePatch(x, patchValue) as never;
}
