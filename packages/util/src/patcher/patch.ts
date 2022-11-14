// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { Force } from '~/cast'
import { equals } from '~/equals'
import type { Merge2, Value } from '~/object'
import {
	assertNotPolluting,
	isPlainObject,
	setProperty,
	tryGetProperty,
} from '~/object'
import type { AlsoAccept } from '~/type'

import type { DeleteIt } from './deleteIt'
import { isDeleteIt } from './deleteIt'
import type { IncrementIt } from './incrementIt'
import { isIncrementIt } from './incrementIt'
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
	| (X extends number ? IncrementIt : never)
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
	[key in keyof P]: ApplyPatch<Value<X, key>, P[key]>
}

export type ApplyPatch<X, P extends ForcePatchFor<X>> = P extends DeleteIt
	? undefined
	: P extends ReplaceIt<infer R>
	? R
	: P extends KeepIt
	? X
	: P extends IncrementIt<infer Amount>
	? X extends bigint
		? bigint
		: Amount extends bigint
		? bigint
		: number
	: P extends object
	? X extends object
		? Merge2<X, ApplyPatchSub<X, P>>
		: ApplyPatchSub<X, P>
	: P

//

export type PatchOptions = {
	/**
	 * Recursion max depth
	 *
	 * - Depth `0` is like assignment
	 * - Depth `1` is like React's state `.update()` for class components
	 *
	 * @defaultValue `Infinity`
	 */
	depth: number
}

export const defaultPatchOptions = {
	depth: Infinity,
}

$Assert.is<typeof defaultPatchOptions, PatchOptions>()

//

export function forcePatch<X, PatchValue extends ForcePatchFor<X>>(
	x: X,
	patchValue: PatchValue,
	options: PatchOptions = defaultPatchOptions,
): ApplyPatch<X, PatchValue> {
	if (isDeleteIt(patchValue)) return undefined as never

	if (isKeepIt(patchValue)) return x as never

	if (isReplaceIt(patchValue)) {
		// console.log(
		// 	'!!!!!!!!equals',
		// 	x,
		// 	patchValue.__replaceIt,
		// 	equals(x, patchValue.__replaceIt),
		// )
		if (equals(x, patchValue.__replaceIt)) return x as never
		else return patchValue.__replaceIt as never
	}

	if (isIncrementIt(patchValue)) {
		if (typeof x === 'number' || typeof x === 'bigint') {
			if (typeof x === 'bigint' || typeof patchValue.__incrementIt === 'bigint')
				return (BigInt(x) + BigInt(patchValue.__incrementIt)) as never
			else return (x + patchValue.__incrementIt) as never
		} else return Number.NaN as never
	}

	if (isPlainObject(x) && isPlainObject(patchValue)) {
		if (options.depth <= 0) {
			if (equals(x, patchValue)) return x as never
			else return patchValue as never
		}

		const res: any = {
			...x,
		}

		let haveChange = false

		for (const [key, value] of Object.entries(patchValue)) {
			assertNotPolluting(key)
			const oldValue = tryGetProperty(res, key) as unknown
			const newValue = forcePatch(oldValue, value, {
				depth: options.depth - 1,
			}) as unknown

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
	options: PatchOptions = defaultPatchOptions,
): Force<X, ApplyPatch<X, PatchValue>> {
	return forcePatch(x, patchValue, options) as never
}
