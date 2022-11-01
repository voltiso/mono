// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocBuilderPlugin } from '~/Doc'
import type { GetDocTag, GetDocTI } from '~/DocRelated'
import type { DocTag } from '~/DocTypes'

import type { AggregatorHandlers } from './AggregatorHandlers'
import { AggregatePlugin } from './AggregatorPlugin'

export function aggregate<
	Source extends DocTag,
	Target extends DocTag,
	AggregateName extends string & keyof GetDocTI<Target>['aggregates'],
>(
	/** Unused - type inference only */
	_source: Source,

	/** Unused - type inference only */
	_target: Target,

	aggregateName: AggregateName,

	handlers: AggregatorHandlers<Source, Target, AggregateName>,
): DocBuilderPlugin<GetDocTag<Source>> {
	return new AggregatePlugin<Source>(aggregateName, handlers) as never
}
