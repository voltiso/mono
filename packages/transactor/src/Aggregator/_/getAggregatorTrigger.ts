// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { $AssumeType, stringFrom, zip } from '@voltiso/util'

import type { $$Doc, Doc, GetDataWithId } from '~/Doc'
import type { $$DocRef } from '~/DocRef'
import { isDocRef } from '~/DocRef/isDocRef'
import { TransactorError } from '~/error'
import type { WithTransactor } from '~/Transactor'
import type { Trigger } from '~/Trigger'
import { guardedValidate } from '~/util'

import type { IAggregatorHandlers } from './AggregatorHandlers'
import { getDocDataView } from './DocDataView'

export type GetTriggerFunction = (params: {
	context: WithTransactor
	name: string
	handlers: IAggregatorHandlers
	autoCreateTarget: boolean
}) => Trigger.After

export const getAggregatorTrigger: GetTriggerFunction = ({
	context,
	name,
	handlers,
	autoCreateTarget,
}) =>
	async function ({ __voltiso, before, after, path, pathArgs, pathParams }) {
		const ctx = { path: path.toString(), pathArgs, pathParams }

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

		const data: GetDataWithId<$$Doc> =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			(before as never) || (after as never)

		assert(data)
		assert(data.__voltiso)

		// ! filtering disabled - just use `.target()` instead
		// if (handlers.filter) {
		// 	const filterResult = await handlers.filter.call(getDocDataView(data))
		// 	if (!filterResult) return
		// }

		const targetHandlerResult = handlers.target.call(getDocDataView(data, ctx))
		const awaitedTargetHandlerResult = await targetHandlerResult

		const [targets, awaitedTargets] =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			awaitedTargetHandlerResult === null
				? [[targetHandlerResult as $$DocRef], [awaitedTargetHandlerResult]]
				: Array.isArray(awaitedTargetHandlerResult)
				? [
						awaitedTargetHandlerResult,
						await Promise.all(awaitedTargetHandlerResult),
				  ]
				: [
						[targetHandlerResult as $$Doc | $$DocRef],
						[awaitedTargetHandlerResult],
				  ]

		// eslint-disable-next-line security/detect-object-injection
		__voltiso.aggregateSource[name] ||= {} //! !!

		// eslint-disable-next-line security/detect-object-injection
		const sourceInfo = __voltiso.aggregateSource[name]

		// console.log('?????????????? process array', targets)

		for (const [target, awaitedTarget] of zip(targets, awaitedTargets)) {
			let finalTarget = awaitedTarget

			if (finalTarget === undefined) continue

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!finalTarget) {
				const handlerReturnedRef = isDocRef(target)

				if (handlerReturnedRef && autoCreateTarget) {
					try {
						// eslint-disable-next-line no-await-in-loop
						finalTarget = await target.set()
					} catch (error) {
						// eslint-disable-next-line no-console
						console.error(
							`aggregate trigger for source '${
								path.toString() as unknown as string
							}': unable to auto-create target: ${
								target.path.toString() as string
							} - cause: ${
								error instanceof Error ? error.message : stringFrom(error)
							}`,
						)
						throw error
					}
				} else {
					let additionalInfo = ''
					if (!autoCreateTarget)
						additionalInfo = ' - hint: you can use `autoCreateTarget: true`'

					const targetDescription = handlerReturnedRef
						? target.path.toString()
						: `null - if your target() function is async, wrap returned ref in an array${additionalInfo}`

					throw new TransactorError(
						`aggregate trigger for source '${
							path.toString() as unknown as string
						}': target does not exist: '${targetDescription}'${additionalInfo}`,
					)
				}
			}

			$AssumeType<Doc>(finalTarget)

			const finalTargetPath = finalTarget.path.toString()

			// eslint-disable-next-line security/detect-object-injection
			const targetInfo = finalTarget.data.__voltiso.aggregateTarget[name] || {
				value: guardedValidate(
					context,
					finalTarget.aggregateSchemas[name],
					handlers.initialValue,
				),

				numSources: 0,
			}

			assert(sourceInfo)
			// eslint-disable-next-line security/detect-object-injection
			const wasAlreadyProcessed = !!sourceInfo[finalTargetPath]

			// console.log('old target info', targetInfo, { wasAlreadyProcessed })

			if (before && wasAlreadyProcessed) {
				// eslint-disable-next-line no-await-in-loop
				targetInfo.value = await handlers.exclude.call(
					getDocDataView(before, ctx),
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
					getDocDataView(after, ctx),
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
	}
