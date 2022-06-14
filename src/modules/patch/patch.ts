/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undefined */
import { AlsoAccept } from '../../AlsoAccept'
import { Force } from '../../Assume'
import { getEntries, isPlain, Merge2, ValueImpl } from '../object'
import { DeleteIt, isDeleteIt } from './deleteIt'
import { isReplaceIt, ReplaceIt } from './replaceIt'

export type Patch = unknown

//

export type PatchFor<X> =
	| (X extends object
			? {
					[key in keyof X]?: PatchFor<X[key]>
			  }
			: never)
	| ReplaceIt<X>
	| (X extends undefined ? DeleteIt : never)
	| X

//

export type ForcePatchFor<X> =
	| (X extends object
			? {
					[key in keyof X]?: ForcePatchFor<X[key]>
			  }
			: never)
	| ReplaceIt<X | AlsoAccept<unknown>>
	| DeleteIt
	| X
	| AlsoAccept<unknown>

//

type ApplyPatchSub<X, P> = {
	[key in keyof P]: ApplyPatch<ValueImpl<X, key>, P[key]>
}

export type ApplyPatch<X, P extends ForcePatchFor<X>> = P extends DeleteIt
	? undefined
	: P extends ReplaceIt<infer R>
	? R
	: P extends object
	? X extends object
		? Merge2<X, ApplyPatchSub<X, P>>
		: ApplyPatchSub<X, P>
	: P

//

export function forcePatch<X, PatchValue extends ForcePatchFor<X>>(
	x: X,
	patchValue: PatchValue
): ApplyPatch<X, PatchValue> {
	if (isDeleteIt(patchValue)) {
		return undefined as never
	} else if (isReplaceIt(patchValue)) {
		return patchValue.__replaceIt as never
	} else if (isPlain(patchValue)) {
		const res: any = x || {}
		for (const [key, val] of getEntries(patchValue)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			res[key] = forcePatch(res[key], val)
		}
		return res as never
	} else return patchValue as never
}

//

export function patch<X, PatchValue extends PatchFor<X>>(
	x: X,
	patchValue: PatchValue
): Force<X, ApplyPatch<X, PatchValue>> {
	return forcePatch(x, patchValue) as never
}
