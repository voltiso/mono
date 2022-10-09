// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/util'

import type { DocLike } from '~/Doc'
import type { DocRefBaseImpl } from '~/DocRef'
import { TransactorError } from '~/error'

export function getBeforeCommits(docRef: DocRefBaseImpl<DocLike>) {
	if (docRef._beforeCommits) return docRef._beforeCommits

	docRef._beforeCommits = []

	for (const { getPathMatches, trigger } of docRef._context.transactor
		._allBeforeCommits) {
		const pathMatches = getPathMatches(docRef.path.toString())

		if (pathMatches) docRef._beforeCommits.push({ pathMatches, trigger })
	}

	if (docRef._context.transactor.refCounters) {
		docRef._beforeCommits.push({
			pathMatches: { pathArgs: [], pathParams: {} },

			trigger: ({ doc, path, __voltiso, possiblyExists }) => {
				// console.log('delete check trigger', path, __voltiso, { possiblyExists })
				if (possiblyExists) return

				assert(__voltiso)
				if (!doc) {
					if (__voltiso.numRefs !== 0) {
						throw new TransactorError(
							`${path.toString()} is referenced but not present: numRefs is ${
								__voltiso.numRefs
							} (should be 0)`,
						)
					}

					//

					for (const [aggregatorName, targetInfo] of Object.entries(
						__voltiso.aggregateTarget,
					)) {
						assert(targetInfo)
						if (targetInfo.numSources !== 0)
							throw new TransactorError(
								`cannot delete ${path.toString()}: it's an active aggregation target (${
									targetInfo.numSources
								} documents currently aggregated) - aggregator name: ${aggregatorName}`,
							)
					}
				}
			},
		})
	}

	return docRef._beforeCommits
}
