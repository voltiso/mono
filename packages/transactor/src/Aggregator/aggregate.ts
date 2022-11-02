// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocBuilderPlugin } from '~/Doc'
import type { $$DocRelated, GetDoc, GetDocTI } from '~/DocRelated'

import type { AggregatorHandlers } from './_/AggregatorHandlers'
import { AggregatePlugin } from './AggregatorPlugin'

export interface AggregateFunction {
	<Source extends $$DocRelated>(
		/** Unused - type inference only */
		_source?: Source,
	): {
		into<
			Target extends $$DocRelated,
			AggregateName extends string & keyof GetDocTI<Target>['aggregates'],
		>(
			/** Unused - type inference only */
			_target: Target,
			aggregateName: AggregateName,
			handlers: AggregatorHandlers<
				GetDocTI<Source>,
				GetDoc<Target>,
				AggregateName
			>,
		): DocBuilderPlugin<Source>
	}
}

export const aggregate: AggregateFunction = (_source?) => ({
	into(_target, aggregateName, handlers) {
		return new AggregatePlugin(aggregateName, handlers as never) as never
	},
})
