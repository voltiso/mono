// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Force } from '~/cast'
import { equals } from '~/equals'
import type { Merge2, ValueImpl } from '~/object'
import {
	assertNotPolluting,
	isPlainObject,
	setProperty,
	tryGetProperty,
} from '~/object'
import type { AlsoAccept } from '~/type'

import type { DeleteIt } from './deleteIt'
import { isDeleteIt } from './deleteIt'
import type { KeepIt } from './keepIt'
import { isKeepIt } from './keepIt'
import type { ReplaceIt } from './replaceIt'
import { isReplaceIt } from './replaceIt'

export type Patch = unknown

//

export type PatchFor<X> =
	| KeepIt
	| (X extends object
			? {
					[key in keyof X]?: PatchFor<X[key]>
			  }
			: never)
	| ReplaceIt<X>
	| (X extends undefined ? DeleteIt : never)
	| X

export type $PatchFor<X> = X extends any ? PatchFor<X> : never

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
	: P extends KeepIt
	? X
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
	if (isDeleteIt(patchValue)) return undefined as never

	if (isKeepIt(patchValue)) return x as never

	if (isReplaceIt(patchValue)) {
		if (equals(x, patchValue.__replaceIt)) return x as never
		else return patchValue.__replaceIt as never
	}

	if (isPlainObject(patchValue)) {
		const res: any = {
			...x,
		}

		let haveChange = false

		for (const [key, value] of Object.entries(patchValue)) {
			assertNotPolluting(key)
			const oldValue = tryGetProperty(res, key) as unknown
			const newValue = forcePatch(oldValue, value) as unknown

			if (newValue !== oldValue) {
				setProperty(res, key, newValue as never)
				haveChange = true
			}

			if (Object.prototype.hasOwnProperty.call(x, key) && isDeleteIt(value)) {
				// eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
				delete res[key]
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
