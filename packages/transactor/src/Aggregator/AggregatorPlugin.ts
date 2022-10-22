// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { assert, assertNotPolluting, assumeType, zip } from '@voltiso/util'

import type {
	DocBuilderPlugin,
	DocConstructor,
	DocLike,
	DocTI,
	DTI,
	GetDataWithId,
	GetDocTI,
	IDoc,
	IDocConstructor,
} from '~/Doc'
import type { DocRefLike } from '~/DocRef'
import { isStrongDocRef, isWeakDocRef } from '~/DocRef'
import type { DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'
import { TransactorError } from '~/error'

import type { IAggregatorHandlers } from './AggregatorHandlers'

export const aggregatePluginName = 'aggregate' as const

declare module '~/DocBuilderPluginResult-module-augmentation' {
	interface DocBuilderPluginResult<TI extends DocTI> {
		aggregate: TI // no change for now
	}
}

export class AggregatePlugin<D extends DocTag> implements DocBuilderPlugin<D> {
	declare readonly DocTag: DocBuilderPlugin<D>['DocTag']

	readonly name = aggregatePluginName

	_aggregateName: string
	_handlers: IAggregatorHandlers

	constructor(aggregateName: string, handlers: IAggregatorHandlers) {
		this._aggregateName = aggregateName
		this._handlers = handlers
	}

	run(docConstructor: DocConstructor<GetDocTI<D>>): IDocConstructor {
		const name = this._aggregateName
		const handlers = this._handlers

		assertNotPolluting(name)

		const autoCreateTarget =
			typeof handlers.autoCreateTarget !== 'undefined'
				? handlers.autoCreateTarget
				: true

		return docConstructor.after(
			`aggregate<${name}>`,
			async ({ __voltiso, before, after, path }) => {
				// ignore self-change
				if (
					before &&
					after &&
					// eslint-disable-next-line security/detect-object-injection
					before.__voltiso.aggregateSource[name] !==
						// eslint-disable-next-line security/detect-object-injection
						after.__voltiso.aggregateSource[name]
				) {
					return
				}

				// console.log('aggregate', before, after)

				const data: GetDataWithId<DocTypes[D][DTI]> =
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					(before as never) || (after as never)

				assert(data, 'should either have before or after')
				assert(data.__voltiso, 'data should include __voltiso')

				if (handlers.filter) {
					const filterResult = await handlers.filter.call(data)
					if (!filterResult) return
				}

				const targetHandlerResult = handlers.target.call(data)
				const awaitedTargetHandlerResult = await targetHandlerResult

				const [targets, awaitedTargets] =
					awaitedTargetHandlerResult === null
						? [
								[targetHandlerResult as DocRefLike],
								[awaitedTargetHandlerResult],
						  ]
						: Array.isArray(awaitedTargetHandlerResult)
						? [
								awaitedTargetHandlerResult,
								await Promise.all(awaitedTargetHandlerResult),
						  ]
						: [
								[targetHandlerResult as DocLike | DocRefLike],
								[awaitedTargetHandlerResult],
						  ]

				// eslint-disable-next-line security/detect-object-injection
				__voltiso.aggregateSource[name] ||= {} //! !!

				// eslint-disable-next-line security/detect-object-injection
				const sourceInfo = __voltiso.aggregateSource[name]

				// console.log('?????????????? process array', targets)

				for (const [target, awaitedTarget] of zip(targets, awaitedTargets)) {
					let finalTarget = awaitedTarget

					if (!finalTarget) {
						const handlerReturnedRef =
							isWeakDocRef(target) || isStrongDocRef(target)

						if (handlerReturnedRef && autoCreateTarget) {
							try {
								// eslint-disable-next-line no-await-in-loop
								finalTarget = await target.set()
							} catch (error) {
								// eslint-disable-next-line no-console
								console.error(
									`aggregate trigger for source '${path.toString()}': unable to auto-create target: ${target.path.toString()}`,
								)
								throw error
							}
						} else {
							let additionalInfo = ''
							if (!autoCreateTarget)
								additionalInfo =
									' - hint: pass `autoCreateTarget: true` to your aggregator options if this would not violate your constraints'

							const targetDescription = handlerReturnedRef
								? target.path.toString()
								: `null - for more info, return DocRef instead of null Doc from your target() handler - this will also make it possible to auto-create target document if 'autoCreateTarget' is set (note: your target() function must not be async, because DocRef is derived from PromiseLike and is automatically unwrapped when awaited)${additionalInfo}`

							throw new TransactorError(
								`aggregate trigger for source '${path.toString()}': target does not exist: '${targetDescription}'${additionalInfo}`,
							)
						}
					}

					assumeType<IDoc>(finalTarget)

					const finalTargetPath = finalTarget.path.toString()

					// eslint-disable-next-line security/detect-object-injection
					const targetInfo = finalTarget.data.__voltiso.aggregateTarget[
						name
					] || {
						value: s
							// eslint-disable-next-line security/detect-object-injection
							.schema(finalTarget.aggregateSchemas[name])
							.validate(handlers.initialValue),

						numSources: 0,
					}

					assert(sourceInfo)
					// eslint-disable-next-line security/detect-object-injection
					const wasAlreadyProcessed = !!sourceInfo[finalTargetPath]

					// console.log('old target info', targetInfo, { wasAlreadyProcessed })

					if (before && wasAlreadyProcessed) {
						// eslint-disable-next-line no-await-in-loop
						targetInfo.value = await handlers.exclude.call(
							before,
							targetInfo.value as never,
						)
						targetInfo.numSources -= 1

						// eslint-disable-next-line security/detect-object-injection
						delete sourceInfo[finalTargetPath]
					}

					// assert(targetInfo.value.length === targetInfo.numSources, 'A')

					if (after) {
						// eslint-disable-next-line no-await-in-loop
						targetInfo.value = await handlers.include.call(
							after,
							targetInfo.value as never,
						)
						targetInfo.numSources += 1

						// update source

						// eslint-disable-next-line security/detect-object-injection
						sourceInfo[finalTargetPath] = true
					}

					// assert(targetInfo.value.length === targetInfo.numSources, 'A')

					assert(
						targetInfo.numSources >= 0,
						`numSources is ${targetInfo.numSources}`,
					)

					// console.log('new target info', targetInfo)

					// update target
					assert(finalTarget.data.__voltiso)
					// eslint-disable-next-line security/detect-object-injection
					finalTarget.data.__voltiso.aggregateTarget[name] = targetInfo as never
				}
			},
		) as IDocConstructor
	}
}
