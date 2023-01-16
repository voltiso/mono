// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocRelatedLike, GetDocTag } from '~'
import type { DocBuilderPlugin } from '~/Doc'
import type { GetDocTI } from '~/DocRelated'

import type { AggregatorHandlers } from './_/AggregatorHandlers'
import { AggregatePlugin } from './AggregatorPlugin'

export interface AggregateFunction {
	<Source extends $$DocRelatedLike>(
		/** Unused - type inference only */
		_source?: Source,
	): {
		into<
			Target extends $$DocRelatedLike,
			AggregateName extends string & keyof GetDocTI<Target>['aggregates'],
		>(
			/** Unused - type inference only */
			_target: Target,
			aggregateName: AggregateName,
		): {
			with(
				handlers: AggregatorHandlers<Source, Target, AggregateName>,
			): DocBuilderPlugin<GetDocTag<Source>>
		}
	}
}

export const aggregate: AggregateFunction = (_source?) => ({
	into: (_target, aggregateName) => ({
		with(handlers) {
			return new AggregatePlugin(aggregateName, handlers as never) as never
		},
	}),
})
