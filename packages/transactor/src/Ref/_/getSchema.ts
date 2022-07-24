// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { undef } from '@voltiso/util'

import type { DocRefBase_ } from '../DocRefBase'

// eslint-disable-next-line max-statements, complexity, sonarjs/cognitive-complexity
export function getSchema(d: DocRefBase_): DocRefBase_['_schema'] {
	if (d._schema !== undef) {
		return d._schema
	}

	const {
		_options: options,
		_allConstSchemas,
		_allPublicSchemas,
		_allPrivateSchemas,
		_allProtectedSchemas,
	} = d._context.transactor

	const constSchemas: InferableObject[] = []
	const publicSchemas: InferableObject[] = []
	const privateSchemas: InferableObject[] = []
	const protectedSchemas: InferableObject[] = []

	const path = d.path.toString()

	for (const { getPathMatches, schema } of _allConstSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) constSchemas.push(schema)
	}

	for (const { getPathMatches, schema } of _allPublicSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) publicSchemas.push(schema)
	}

	for (const { getPathMatches, schema } of _allPrivateSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) privateSchemas.push(schema)
	}

	for (const { getPathMatches, schema } of _allProtectedSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) protectedSchemas.push(schema)
	}

	if (
		constSchemas.length === 0 &&
		publicSchemas.length === 0 &&
		privateSchemas.length === 0 &&
		protectedSchemas.length === 0
	) {
		if (options.requireSchemas)
			throw new Error(
				`missing schema for ${path} - add a schema, or set requireSchemas = false`,
			)

		d._constSchema = {}
		d._privateSchema = {}
		d._protectedSchema = {}

		return (d._schema = null)
	}

	let thisSchema: InferableObject = {}
	d._constSchema = {}
	d._privateSchema = {}
	d._protectedSchema = {}

	for (const schema of constSchemas) {
		thisSchema = { ...thisSchema, ...schema }
		d._constSchema = { ...d._constSchema, ...schema }
	}

	for (const schema of publicSchemas) {
		thisSchema = { ...thisSchema, ...schema }
	}

	for (const schema of privateSchemas) {
		thisSchema = { ...thisSchema, ...schema }
		d._privateSchema = { ...d._privateSchema, ...schema }
	}

	for (const schema of protectedSchemas) {
		thisSchema = { ...thisSchema, ...schema }
		d._protectedSchema = { ...d._protectedSchema, ...schema }
	}

	const final = s.schema({
		...thisSchema,

		__voltiso: s.object({
			numRefs: s.number,
		}).optional,
	})

	const partial = final.deepPartial

	d._schema = { final, partial }
	return d._schema
}
