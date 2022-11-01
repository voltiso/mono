// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isPlainObject } from '@voltiso/util'

import type { CustomDocRef, DocRef, DocRefTriggerEntry } from '~/DocRef'
import { isStrongDocRef } from '~/DocRef'
import { TransactorError } from '~/error'
import type { AfterTrigger } from '~/Trigger'

function forEachStrongRef(o: any, f: (r: DocRef) => void) {
	if (isStrongDocRef(o)) {
		f(o as never)
	} else if (Array.isArray(o)) {
		for (const child of o) forEachStrongRef(child, f)
	} else if (isPlainObject(o)) {
		for (const child of Object.values(o)) forEachStrongRef(child, f)
	}
}

export function getAfterTriggers(
	docRef: CustomDocRef,
): DocRefTriggerEntry<AfterTrigger>[] {
	if (docRef._afterTriggers) return docRef._afterTriggers as never

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
					const path = r.path.toString()
					const v = m.get(path) || { before: 0, after: 0 }
					m.set(path, { ...v, before: v.before + 1 })
				})

				forEachStrongRef(after, r => {
					const path = r.path.toString()
					const v = m.get(path) || { before: 0, after: 0 }
					m.set(path, { ...v, after: v.after + 1 })
				})

				for (const [targetPath, ba] of m.entries()) {
					const diff = ba.after - ba.before

					// console.log(
					// 	`NUM REFS += ${diff} (${path.toString()} -> ${targetPath})`,
					// )

					if (diff === 0) continue

					const targetDocRef = db.doc(targetPath)

					// ! TODO ! no-await-in-loop
					// eslint-disable-next-line no-await-in-loop
					const targetDoc = await targetDocRef

					// ! TODO ! no-await-in-loop
					// eslint-disable-next-line no-await-in-loop
					const __voltiso = await (async () => {
						try {
							return await targetDocRef.__voltiso // returns __voltiso from transaction cache if doc is already deleted
						} catch {
							throw new TransactorError(
								`ref trigger for ${path.toString()}: get StrongRef target ${targetPath} failed (database corrupt?)`,
							)
						}
					})()

					// if (!__voltiso)
					// 	throw new TransactorError(
					// 		`ref: referenced doc does not exist ${path.pathString} -> ${targetPath}`,
					// 	)

					__voltiso.numRefs += diff

					// console.log('__voltiso.numRefs', targetDocRef.path.toString(), __voltiso.numRefs)

					/** If the database is partial, check only if targetDoc exists */
					const shouldCheck =
						!docRef._context.transactor._options.partial || !!targetDoc

					if (shouldCheck && __voltiso.numRefs < ba.after) {
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

	return docRef._afterTriggers as never
}
