// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { SchemaLike } from '@voltiso/schemar.types'
import { mapValues } from '@voltiso/util'

import type { DocRefBaseImpl } from '~/Ref'

export function getAggregateSchemas(d: DocRefBaseImpl<any>) {
	if (d._aggregateSchemas !== undefined) return d._aggregateSchemas

	const { _allAggregateSchemas } = d._context.transactor

	let aggregateSchemas: Record<string, SchemaLike> = {}

	const path = d.path.toString()

	for (const { getPathMatches, schema } of _allAggregateSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) {
			aggregateSchemas = {
				...aggregateSchemas,
				...mapValues(schema, schemable => s.schema(schemable) as SchemaLike),
			}
		}
	}

	d._aggregateSchemas = aggregateSchemas

	return d._aggregateSchemas
}
