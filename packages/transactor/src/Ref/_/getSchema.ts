// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { InferableObject, ISchema } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'

import { sIntrinsicFields } from '~'
import type { DocRefBaseImpl } from '~/Ref'

export function getIdSchemas(
	d: DocRefBaseImpl<any>,
) {
	if (d._idSchemas !== undefined) return d._idSchemas

	const { _allIdSchemas } = d._context.transactor

	const idSchemas: ISchema<string>[] = []

	const path = d.path.toString()

	for (const { getPathMatches, schema } of _allIdSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) idSchemas.push(schema as never)
	}

	d._idSchemas = idSchemas

	return d._idSchemas
}

export function getSchema(d: DocRefBaseImpl): DocRefBaseImpl['_schema'] {
	if (d._schema !== undefined) {
		return d._schema
	}

	const {
		_options,
		_allPublicOnCreationSchemas,
		_allPublicSchemas,
		_allPrivateSchemas,
	} = d._context.transactor

	const publicOnCreationSchemas: InferableObject[] = []
	const publicSchemas: InferableObject[] = []
	const privateSchemas: InferableObject[] = []

	const path = d.path.toString()

	for (const { getPathMatches, schema } of _allPublicOnCreationSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) publicOnCreationSchemas.push(schema)
	}

	for (const { getPathMatches, schema } of _allPublicSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) publicSchemas.push(schema)
	}

	for (const { getPathMatches, schema } of _allPrivateSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		if (pathParams || pathArgs) privateSchemas.push(schema)
	}

	if (
		publicOnCreationSchemas.length === 0 &&
		publicSchemas.length === 0 &&
		privateSchemas.length === 0
	) {
		if (_options.requireSchemas)
			throw new Error(
				`missing schema for ${path} - add a schema, or set requireSchemas = false`,
			)

		d._publicOnCreationSchema = {}
		d._privateSchema = {}

		return (d._schema = null)
	}

	let thisSchema: InferableObject = {}
	d._publicOnCreationSchema = {}
	d._privateSchema = {}

	for (const schema of publicOnCreationSchemas) {
		thisSchema = { ...thisSchema, ...schema }
		d._publicOnCreationSchema = { ...d._publicOnCreationSchema, ...schema }
	}

	for (const schema of publicSchemas) {
		thisSchema = { ...thisSchema, ...schema }
	}

	for (const schema of privateSchemas) {
		thisSchema = { ...thisSchema, ...schema }
		d._privateSchema = { ...d._privateSchema, ...schema }
	}

	const final = s.infer({
		...thisSchema,
		...sIntrinsicFields.getShape,
	})

	const partial = final.deepPartial

	$assert(final)
	$assert(partial)

	d._schema = { final, partial }
	return d._schema
}
