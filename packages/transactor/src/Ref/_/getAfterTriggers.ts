// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { $assert } from '@voltiso/assertor'

import { isStrongDocRef } from '~'
import type { IDoc } from '~/Doc'
import type { DocRefBaseImpl, IRef, WeakDocRef } from '~/Ref'

function forEachStrongRef(o: any, f: (r: IRef) => void) {
	if (isStrongDocRef(o)) {
		f(o)
	} else if (Array.isArray(o)) {
		for (const v of o) forEachStrongRef(v, f)
	} else if (o?.constructor === Object) {
		for (const v of Object.values(o)) forEachStrongRef(v, f)
	}
}

export function getAfterTriggers(docRef: DocRefBaseImpl) {
	if (docRef._afterTriggers) return docRef._afterTriggers

	docRef._afterTriggers = []

	for (const { getPathMatches, trigger } of docRef._context.transactor
		._allAfterTriggers) {
		const pathMatches = getPathMatches(docRef.path.toString())

		if (pathMatches) docRef._afterTriggers.push({ pathMatches, trigger })
	}

	if (docRef._context.transactor.refCounters) {
		docRef._afterTriggers.push({
			pathMatches: { pathArgs: [], pathParams: {} },

			trigger: async ({ before, after, path, db }) => {
				// console.log('ref counting trigger', path.toString())
				const m = new Map<string, { before: number; after: number }>()

				forEachStrongRef(before, r => {
					const path = r.path.pathString
					const v = m.get(path) || { before: 0, after: 0 }
					m.set(path, { ...v, before: v.before + 1 })
				})

				forEachStrongRef(after, r => {
					const path = r.path.pathString
					const v = m.get(path) || { before: 0, after: 0 }
					m.set(path, { ...v, after: v.after + 1 })
				})

				for (const [targetPath, ba] of m.entries()) {
					const diff = ba.after - ba.before

					// console.log(
					// 	`NUM REFS += ${diff} (${path.toString()} -> ${targetPath})`,
					// )

					if (diff === 0) continue

					const docPath = db(targetPath) as unknown as WeakDocRef<IDoc>
					// ! TODO !
					// eslint-disable-next-line no-await-in-loop
					const __voltiso = await docPath.__voltiso // returns __voltiso from transaction cache if doc is already deleted

					$assert(__voltiso)

					// if (!__voltiso)
					// 	throw new Error(
					// 		`ref: referenced doc does not exist ${path.pathString} -> ${targetPath}`,
					// 	)

					__voltiso.numRefs += diff

					// console.log('__voltiso.numRefs', __voltiso.numRefs)

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

	return docRef._afterTriggers
}
