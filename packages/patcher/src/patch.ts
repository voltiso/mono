// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept, Force, Merge2, ValueImpl } from '@voltiso/util'
import {
	getEntries,
	isPlain,
	setProperty,
	tryGetProperty,
	undef,
} from '@voltiso/util'
import { deepEqual } from 'fast-equals'

import type { DeleteIt } from './deleteIt.js'
import { isDeleteIt } from './deleteIt.js'
import type { ReplaceIt } from './replaceIt.js'
import { isReplaceIt } from './replaceIt.js'

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
	patchValue: PatchValue,
): ApplyPatch<X, PatchValue> {
	if (isDeleteIt(patchValue)) return undef as never

	if (isReplaceIt(patchValue)) {
		// if (dequal(x, patchValue.__replaceIt)) return x as never
		if (deepEqual(x, patchValue.__replaceIt)) return x as never
		else return patchValue.__replaceIt as never
	}

	if (isPlain(patchValue)) {
		const res: any = {
			...x,
		}
		let haveChange = false

		for (const [key, value] of getEntries(patchValue)) {
			const oldValue = tryGetProperty(res, key)
			const newValue = forcePatch(oldValue, value)

			if (newValue !== oldValue) {
				setProperty(res, key, newValue as never)
				haveChange = true
			}
		}

		if (haveChange) return res as never
		else return x as never
	}

	return patchValue as never
}

//

export function patch<X, PatchValue extends PatchFor<X>>(
	x: X,
	patchValue: PatchValue,
): Force<X, ApplyPatch<X, PatchValue>> {
	return forcePatch(x, patchValue) as never
}
