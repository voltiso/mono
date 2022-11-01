// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { SchemaLike } from '@voltiso/schemar.types'
import { $AssumeType, mapValues } from '@voltiso/util'

import type { $$DocRef, DocRef } from '~/DocRef'
import type { GetDocTI } from '~/DocRelated'

export function getAggregateSchemas<Ref extends $$DocRef>(
	ref: Ref,
): GetDocTI<Ref>['aggregates'] {
	$AssumeType<DocRef>(ref)
	if (ref._aggregateSchemas !== undefined) return ref._aggregateSchemas as never

	const { _allAggregateSchemas } = ref._context.transactor

	let aggregateSchemas: Record<string, SchemaLike> = {}

	const path = ref.path.toString()

	for (const { getPathMatches, schema } of _allAggregateSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) {
			aggregateSchemas = {
				...aggregateSchemas,
				...mapValues(schema, schemable => s.schema(schemable) as SchemaLike),
			}
		}
	}

	ref._aggregateSchemas = aggregateSchemas

	return ref._aggregateSchemas as never
}
