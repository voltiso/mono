// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { Force } from '~/cast'
import { equals } from '~/equals'
import { add } from '~/number'
import type { Merge, Value } from '~/object'
import { assertNotPolluting, isPlainObject, setProperty } from '~/object'
import type { AlsoAccept } from '~/type'

import type { ArraySetUpdateIt } from './arraySetUpdateIt'
import { isArraySetUpdateIt } from './arraySetUpdateIt'
import { assertNoSentinels } from './assertNoSentinels'
import type { DeleteIt } from './deleteIt'
import { isDeleteIt, isDeleteItIfPresent } from './deleteIt'
import type { IncrementIt } from './incrementIt'
import { isIncrementIt } from './incrementIt'
import type { KeepIt } from './keepIt'
import { isKeepIt } from './keepIt'
import type { PatchFor } from './PatchFor'
import type { ReplaceIt } from './replaceIt'
import { isReplaceIt } from './replaceIt'
import { stripSentinels } from './stripSentinels'

//

export type ForcePatchFor<X> =
	| (X extends object
			? {
					[key in keyof X]?: ForcePatchFor<X[key]>
				}
			: never)
	| ReplaceIt<X | AlsoAccept<unknown>>
	| ArraySetUpdateIt
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
						? Merge<X, ApplyPatchSub<X, P>>
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
Object.freeze(defaultPatchOptions)

$Assert.is<typeof defaultPatchOptions, PatchOptions>()

//

export function forcePatch<X, PatchValue extends ForcePatchFor<X>>(
	x: X,
	patchValue: PatchValue,
	options: PatchOptions = defaultPatchOptions,
): ApplyPatch<X, PatchValue> {
	if (isDeleteIt(patchValue)) return undefined as never
	if (isDeleteItIfPresent(patchValue)) return undefined as never

	if (isKeepIt(patchValue)) return x as never

	if (isReplaceIt(patchValue)) {
		if (equals(x, patchValue.__replaceIt)) return x as never
		else return patchValue.__replaceIt as never
	}

	if (isArraySetUpdateIt(patchValue)) {
		const result = new Set(Array.isArray(x) ? x : [])

		for (const item of patchValue.__arraySetUpdateIt.add || []) {
			result.add(item)
		}

		for (const item of patchValue.__arraySetUpdateIt.remove || []) {
			result.delete(item)
		}

		return [...result] as never
	}

	if (isIncrementIt(patchValue)) {
		if (typeof x === 'number' || typeof x === 'bigint') {
			return add(x, patchValue.__incrementIt) as never
		} else {
			throw new TypeError(
				`forcePatch: cannot increment non-number: ${typeof x}`,
			)
		}
	}

	if (isPlainObject(x) && isPlainObject(patchValue)) {
		if (options.depth <= 0) {
			if (equals(x, patchValue)) {
				assertNoSentinels(x)
				return x as never
			}

			return stripSentinels(patchValue) as never
		}

		const res: any = {
			...x,
		}

		let haveChange = false

		for (const [key, value] of Object.entries(patchValue)) {
			assertNotPolluting(key)

			const haveOldValue = Object.prototype.hasOwnProperty.call(x, key)

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const oldValue = res[key] as unknown

			if (!haveOldValue && isDeleteIt(value))
				throw new TypeError(`forcePatch: cannot delete non-existing key ${key}`)

			if (isDeleteIt(value) || isDeleteItIfPresent(value)) {
				if (haveOldValue) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					delete res[key]
					haveChange = true
				}
				continue
			}

			const newValue = forcePatch(oldValue, value, {
				depth: options.depth - 1,
			}) as unknown

			if (newValue !== oldValue || !haveOldValue) {
				setProperty(res, key, newValue as never)
				haveChange = true
			}
		}

		if (haveChange) return res as never
		else return x as never
	}

	return stripSentinels(patchValue) as never
}

//

export function patch<X, PatchValue extends PatchFor<X>>(
	x: X,
	patchValue: PatchValue,
	options: PatchOptions = defaultPatchOptions,
): Force<X, ApplyPatch<X, PatchValue>> {
	return forcePatch(x, patchValue, options) as never
}
