// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'

import type { DocLike } from '~'
import { TransactorError } from '~'
import type { DocRefImpl } from '~/Ref'

export function getBeforeCommits(docRef: DocRefImpl<DocLike>) {
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

			trigger: ({ doc, path, __voltiso }) => {
				$assert(__voltiso)
				if (!doc) {
					if (__voltiso.numRefs !== 0) {
						throw new TransactorError(
							`cannot delete ${path.toString()}: numRefs is ${
								__voltiso.numRefs
							} (should be 0)`,
						)
					}

					//

					for (const [aggregatorName, targetInfo] of Object.entries(
						__voltiso.aggregateTarget,
					)) {
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
