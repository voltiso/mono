// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { $AssumeType } from '@voltiso/util'

import type { _CustomDocRef, $$DocRef, DocRefTriggerEntry } from '~/DocRef'
import { TransactorError } from '~/error'
import type { VoltisoEntry } from '~/schemas'
import type { Trigger } from '~/Trigger'

export function getBeforeCommits(
	docRef: $$DocRef,
): DocRefTriggerEntry<Trigger.BeforeCommit>[] {
	$AssumeType<_CustomDocRef>(docRef)

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

					$AssumeType<VoltisoEntry>(__voltiso)

					for (const [aggregatorName, targetInfo] of Object.entries(
						__voltiso.aggregateTarget,
					)) {
						assert(targetInfo)
						// eslint-disable-next-line sonarjs/nested-control-flow
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
