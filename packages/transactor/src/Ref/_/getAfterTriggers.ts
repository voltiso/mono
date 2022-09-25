// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { $assert } from '@voltiso/assertor'

import type { IntrinsicFields } from '~'
import type { DocLike, IDoc } from '~/Doc'
import { TransactorError } from '~/error'
import type { DocRefBaseImpl, IRef, WeakDocRef } from '~/Ref'
import { isStrongDocRef } from '~/Ref'

function forEachStrongRef(o: any, f: (r: IRef) => void) {
	if (isStrongDocRef(o)) {
		f(o)
	} else if (Array.isArray(o)) {
		for (const v of o) forEachStrongRef(v, f)
	} else if (o?.constructor === Object) {
		for (const v of Object.values(o)) forEachStrongRef(v, f)
	}
}

export function getAfterTriggers(docRef: DocRefBaseImpl<DocLike>) {
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

					// ! TODO ! no-await-in-loop

					let __voltiso: IntrinsicFields['__voltiso'] | undefined

					try {
						// eslint-disable-next-line no-await-in-loop
						__voltiso = await docPath.__voltiso // returns __voltiso from transaction cache if doc is already deleted
					} catch {
						throw new TransactorError(
							`ref trigger for ${path.toString()}: get StrongRef target ${targetPath} failed (database corrupt?)`,
						)
					}

					$assert(__voltiso)

					// if (!__voltiso)
					// 	throw new TransactorError(
					// 		`ref: referenced doc does not exist ${path.pathString} -> ${targetPath}`,
					// 	)

					__voltiso.numRefs += diff

					// console.log('__voltiso.numRefs', __voltiso.numRefs)

					if (__voltiso.numRefs < ba.after) {
						throw new TransactorError(
							`ref trigger for ${path.toString()}: ${targetPath.toString()}.__voltiso.numRefs === ${
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
