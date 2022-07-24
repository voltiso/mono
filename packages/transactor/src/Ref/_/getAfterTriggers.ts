// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import type { IDoc } from '../../Doc'
import type { DocRefBase_ } from '../DocRefBase.js'
import type { IRef } from '../IRef.js'
import { WeakDocRef } from '../WeakDocRef.js'

function forEachRef(o: any, f: (r: IRef) => void) {
	if (o instanceof WeakDocRef) {
		f(o as any)
	} else if (Array.isArray(o)) {
		for (const v of o) forEachRef(v, f)
	} else if (o?.constructor === Object) {
		for (const v of Object.values(o)) forEachRef(v, f)
	}
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function getAfterTriggers(this: DocRefBase_) {
	if (this._afterTriggers) return this._afterTriggers

	this._afterTriggers = []

	for (const { getPathMatches, trigger } of this._context.transactor
		._allAfterTriggers) {
		const pathMatches = getPathMatches(this.path.toString())

		if (pathMatches) this._afterTriggers.push({ pathMatches, trigger })
	}

	if (this._context.transactor.refCounters) {
		this._afterTriggers.push({
			pathMatches: { pathArgs: [], pathParams: {} },

			trigger: async ({ before, after, path, db }) => {
				// console.log('trigger', path.toString())
				const m = new Map<string, { before: number; after: number }>()

				forEachRef(before, r => {
					const path = r.path.pathString
					const v = m.get(path) || { before: 0, after: 0 }
					m.set(path, { ...v, before: v.before + 1 })
				})

				forEachRef(after, r => {
					const path = r.path.pathString
					const v = m.get(path) || { before: 0, after: 0 }
					m.set(path, { ...v, after: v.after + 1 })
				})

				for (const [targetPath, ba] of m.entries()) {
					const diff = ba.after - ba.before

					if (diff === 0) continue

					const docPath = db(targetPath) as unknown as WeakDocRef<IDoc>
					// ! TODO !
					// eslint-disable-next-line no-await-in-loop
					const __voltiso = await docPath.__voltiso // returns __voltiso from transaction cache if doc is already deleted

					if (!__voltiso)
						throw new Error(
							`ref: referenced doc does not exist ${path.pathString} -> ${targetPath}`,
						)

					// console.log(`NUM REFS += ${diff} (${path.toString()} -> ${targetPath})`)
					__voltiso.numRefs += diff

					if (__voltiso.numRefs < ba.after) {
						throw new Error(
							`ref: ${path.toString()} refCounter === ${
								__voltiso.numRefs
							} too small - database corrupt`,
						)
					}
				}
			},
		})
	}

	return this._afterTriggers
}
