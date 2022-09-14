// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Force } from '@voltiso/util'
import { mapValues } from '@voltiso/util'

import type { ApplyPatch, PatchFor } from './patch'
import { forcePatch } from './patch'
import { replaceIt } from './replaceIt'
import { isPatchSentinel } from './Sentinel'

/** Similar to `patch`, but performs shallow merge by default */
export function patchUpdate<Obj, PatchValue extends PatchFor<Obj>>(
	x: Obj,
	patchValue: PatchValue,
): Force<Obj, ApplyPatch<Obj, PatchValue>> {
	if (typeof x !== 'object' || x === null) return patchValue as never

	const finalPatch = mapValues(
		patchValue as PatchFor<Record<keyof any, unknown>>,
		((x: unknown) =>
			isPatchSentinel(x) ? x : (replaceIt(x) as never)) as never,
	)
	return forcePatch(x, finalPatch) as never
}
