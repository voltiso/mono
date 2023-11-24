// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { $$SchemableObject, IObject$, Schema } from '@voltiso/schemar'
import { isObjectSchema } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { $AssumeType } from '@voltiso/util'

import { isWithId } from '~/Data'
import type { _CustomDocRef, $$DocRef } from '~/DocRef'
import { TransactorError } from '~/error'
import type { IntrinsicFieldsSchema } from '~/schemas'
import { sIntrinsicFields } from '~/schemas'

export function getIdSchemas(ref: $$DocRef) {
	// eslint-disable-next-line etc/no-internal
	$AssumeType<_CustomDocRef>(ref)
	if (ref._idSchemas !== undefined) return ref._idSchemas

	const { _allIdSchemas } = ref._context.transactor

	const idSchemas: Schema<string>[] = []

	const path = ref.path.toString()

	for (const { getPathMatches, schema } of _allIdSchemas) {
		const { pathParams, pathArgs } = getPathMatches(path) || {}

		// console.log('get ID schema for', ref.path.toString(), {pathParams, pathArgs})

		if (pathParams || pathArgs) idSchemas.push(schema as never)
	}

	ref._idSchemas = idSchemas

	return ref._idSchemas
}

export function getSchema(ref: $$DocRef): IntrinsicFieldsSchema | null {
	// eslint-disable-next-line etc/no-internal
	$AssumeType<_CustomDocRef>(ref)

	if (ref._schema !== undefined) {
		return ref._schema
	}

	const {
		_options,
		_allPublicOnCreationSchemas,
		_allPublicSchemas,
		_allPrivateSchemas,
	} = ref._context.transactor

	const publicOnCreationSchemas: $$SchemableObject[] = []
	const publicSchemas: $$SchemableObject[] = []
	const privateSchemas: $$SchemableObject[] = []

	const path = ref.path.toString()

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

		ref._publicOnCreationSchema = s.object({}) as never
		ref._privateSchema = s.object({}) as never

		return (ref._schema = null)
	}

	let thisSchema: IObject$ = s.object({}) as never
	ref._publicOnCreationSchema = s.object({}) as unknown as IObject$
	ref._privateSchema = s.object({}) as unknown as IObject$

	for (const schema of publicOnCreationSchemas) {
		thisSchema = thisSchema.and(schema) as never
		$assert(isObjectSchema(thisSchema))

		ref._publicOnCreationSchema = ref._publicOnCreationSchema.and(
			schema,
		) as never
	}

	for (const schema of publicSchemas) {
		// console.log('and with', schema)
		thisSchema = thisSchema.and(schema) as never
		$assert(isObjectSchema(thisSchema))
	}

	for (const schema of privateSchemas) {
		thisSchema = thisSchema.and(schema) as never
		// console.log({ schema })
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
		$assert(isObjectSchema(thisSchema), `after and'ing with ${schema}`)
		ref._privateSchema = ref._privateSchema.and(schema) as never
	}

	const final: IntrinsicFieldsSchema = thisSchema.and(sIntrinsicFields) as never

	const { allowIdField } = _options

	if (!allowIdField && isWithId(final)) {
		throw new TransactorError(
			'id field provided as part of regular data schemas - use `idSchema` instead, ' +
				'or use `allowIdField` transactor option to allow `id` fields as part of regular document data',
		)
	}

	ref._schema = final

	return ref._schema
}
