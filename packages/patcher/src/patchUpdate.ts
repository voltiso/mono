// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Force } from '@voltiso/util'
import { mapValues } from '@voltiso/util'

import type { ApplyPatch, PatchFor } from './patch.js'
import { forcePatch } from './patch.js'
import { replaceIt } from './replaceIt.js'
import { isPatchSentinel } from './Sentinel.js'

/** Similar to `patch`, but performs shallow merge by default */
export function patchUpdate<
	Obj extends object,
	PatchValue extends PatchFor<Obj>,
>(x: Obj, patchValue: PatchValue): Force<Obj, ApplyPatch<Obj, PatchValue>> {
	const finalPatch = mapValues(patchValue, x =>
		isPatchSentinel(x) ? x : (replaceIt(x) as never),
	)
	return forcePatch(x, finalPatch) as never
}
