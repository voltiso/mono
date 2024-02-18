// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting, isDefined } from '@voltiso/util'

import type { DocBuilderPlugin } from '~/Doc'
import type { $$DocConstructor, DocConstructor } from '~/DocConstructor'
import type { $$DocRelated, GetDocTI } from '~/DocRelated'

import type { IAggregatorHandlers } from './_/AggregatorHandlers'
import { getAggregatorTrigger } from './_/getAggregatorTrigger'

export const aggregatePluginName = 'aggregate' as const

export class AggregatePlugin<R extends $$DocRelated>
	implements DocBuilderPlugin<R>
{
	declare readonly DocTag: DocBuilderPlugin<R>['DocTag']

	readonly name = aggregatePluginName

	_aggregateName: string
	_handlers: IAggregatorHandlers

	constructor(aggregateName: string, handlers: IAggregatorHandlers) {
		this._aggregateName = aggregateName
		this._handlers = handlers
	}

	run(docConstructor: DocConstructor<GetDocTI<R>>): $$DocConstructor {
		const name = this._aggregateName
		const handlers = this._handlers

		assertNotPolluting(name)

		const autoCreateTarget = isDefined(handlers.autoCreateTarget)
			? handlers.autoCreateTarget
			: true

		const trigger = getAggregatorTrigger({
			name,
			handlers,
			autoCreateTarget,
		})

		return docConstructor.after(`aggregate<${name}>`, trigger as never) as never
	}
}
