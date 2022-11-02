// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type {
	$$SchemableObject,
	IObject,
	ISchema,
} from '@voltiso/schemar.types'
import { $AssumeType } from '@voltiso/util'

import { isWithId } from '~/Data'
import type { $$DocRef, WeakDocRef } from '~/DocRef'
import { TransactorError } from '~/error'
import { sIntrinsicFields } from '~/schemas'

export function getIdSchemas(ref: $$DocRef) {
	$AssumeType<WeakDocRef>(ref)
	if (ref._idSchemas !== undefined) return ref._idSchemas

	const { _allIdSchemas } = ref._context.transactor

	const idSchemas: ISchema<string>[] = []

	const path = ref.path.toString()

	for (const { getPathMatches, schema } of _allIdSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		// console.log('get ID schema for', ref.path.toString(), {pathParams, pathArgs})

		if (pathParams || pathArgs) idSchemas.push(schema as never)
	}

	ref._idSchemas = idSchemas

	return ref._idSchemas
}

export function getSchema(d: $$DocRef): WeakDocRef['_schema'] {
	$AssumeType<WeakDocRef>(d)

	if (d._schema !== undefined) {
		return d._schema
	}

	const {
		_options,
		_allPublicOnCreationSchemas,
		_allPublicSchemas,
		_allPrivateSchemas,
	} = d._context.transactor

	const publicOnCreationSchemas: $$SchemableObject[] = []
	const publicSchemas: $$SchemableObject[] = []
	const privateSchemas: $$SchemableObject[] = []

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
			throw new TransactorError(
				`missing schema for ${path} - add a schema, or set requireSchemas = false`,
			)

		d._publicOnCreationSchema = s.object({}) as never
		d._privateSchema = s.object({}) as never

		return (d._schema = null)
	}

	let thisSchema: IObject = s.object({}) as never
	d._publicOnCreationSchema = s.object({}) as unknown as IObject
	d._privateSchema = s.object({}) as unknown as IObject

	for (const schema of publicOnCreationSchemas) {
		thisSchema = thisSchema.and(schema) as never
		d._publicOnCreationSchema = d._publicOnCreationSchema.and(schema) as never
	}

	for (const schema of publicSchemas) {
		thisSchema = thisSchema.and(schema) as never
	}

	for (const schema of privateSchemas) {
		thisSchema = thisSchema.and(schema) as never
		d._privateSchema = d._privateSchema.and(schema) as never
	}

	const final: IObject = thisSchema.and(sIntrinsicFields) as never

	const { allowIdField } = _options

	if (!allowIdField && isWithId(final)) {
		throw new TransactorError(
			'id field provided as part of regular data schemas - use `idSchema` instead, ' +
				'or use `allowIdField` transactor option to allow `id` fields as part of regular document data',
		)
	}

	const partial: IObject = final.deepPartial as never

	// $assert(final)
	// $assert(partial)

	d._schema = {
		final: final.simple as never,
		partial: partial.simple as never,
	}

	return d._schema
}
