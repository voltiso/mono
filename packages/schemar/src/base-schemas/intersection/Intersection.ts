// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import {
	$AssumeType,
	$fastAssert,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import { schema_ } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { SchemaOptions } from '~/Schema/options/SchemaOptions'
import type { Get$ } from '~/types/Get$'
import type { Input_, Output_ } from '~/types/GetType/GetType'
import type { Schema } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'
import type { SchemarAndN } from '~/types/SchemarOp/ops/SchemarAnd'

import { CustomObjectImpl } from '../object/_/CustomObjectImpl'
import { defaultObjectOptions } from '../object/defaultObjectOptions'
import type { $$Object } from '../object/IObject'
import { is$$ObjectSchema, isObjectSchema } from '../object/IObject'
import type { ObjectOptions } from '../object/ObjectOptions'
import type { $$Record } from '../record/IRecord'
import { is$$RecordSchema, isRecordSchema } from '../record/IRecord'
import type { RecordOptions } from '../record/RecordOptions'
import type { $$UnknownObject } from '../unknownObject/IUnknownObject'
import { isUnknownObjectSchema } from '../unknownObject/IUnknownObject'
import type { UnknownObjectOptions } from '../unknownObject/UnknownObjectOptions'
import { is$$UnknownRecordSchema } from '../unknownRecord/CustomUnknownRecord'
import { record } from '../unknownRecord/UnknownRecord'
import { IntersectionImpl } from './_/IntersectionImpl'
import type {
	CustomIntersection,
	CustomIntersection$,
} from './CustomIntersection'
import { isIntersectionSchema } from './IIntersection'

export type Intersection<Ts extends $$Schemable[]> = CustomIntersection<{
	schemas: Ts

	Output: IntersectionDetail.GetOutput<Ts>
	Input: IntersectionDetail.GetInput<Ts>
}>

export type Intersection$<Ts extends $$Schemable[]> = CustomIntersection$<{
	schemas: Ts

	Output: IntersectionDetail.GetOutput<Ts>
	Input: IntersectionDetail.GetInput<Ts>
}>

export declare namespace IntersectionDetail {
	export type SafeFlatten<T> = T extends (...args: any) => any ? T : _<T>

	export type GetOutput<Ts extends $$Schemable[]> = GetOutput.Rec<unknown, Ts>

	export namespace GetOutput {
		export type Rec<acc, Ts extends unknown[]> = Ts extends [
			infer T,
			...infer Ts,
		]
			? Rec<SafeFlatten<acc & Output_<T>>, Ts>
			: acc
	}

	export type GetInput<Ts extends $$Schemable[]> = GetInput.Rec<unknown, Ts>

	export namespace GetInput {
		export type Rec<acc, Ts extends unknown[]> = Ts extends [
			infer T,
			...infer Ts,
		]
			? Rec<SafeFlatten<acc & Input_<T>>, Ts>
			: acc
	}
}

//

export type Intersection$Constructor = new <Ts extends $$Schemable[]>(
	schemas: Ts,
) => Intersection$<Ts>

export const Intersection$ = lazyConstructor(
	() => IntersectionImpl,
) as unknown as Intersection$Constructor

//

function _check(
	s: Schema,
): s is typeof s & ($$Object | $$UnknownObject | $$Record) {
	return isObjectSchema(s) || isUnknownObjectSchema(s) || isRecordSchema(s)
}

export function and<Ts extends $$Schemable[]>(
	...inputSchemas: Ts
): SchemarAndN<Ts> {
	let schemas = [] as Schema[]

	for (const inputSchema of inputSchemas) {
		if (isIntersectionSchema(inputSchema))
			schemas = [...schemas, ...(inputSchema.getSchemas as Schema[])]
		else schemas.push(schema_(inputSchema))
	}

	schemas = schemas.filter(s => !is$$UnknownRecordSchema(s))
	if (schemas.length === 0) return record as never

	const objectSchemas = schemas.filter(_check)
	const otherSchemas = schemas.filter(s => !_check(s))

	if (objectSchemas.length === 0) {
		return new Intersection$(otherSchemas) as never
	}

	const finalObjectSchema = andObjects(...objectSchemas)

	if (otherSchemas.length === 0) return finalObjectSchema
	else return new Intersection$([...otherSchemas, finalObjectSchema]) as never
}

//

export function andObjects<
	Ts extends ($$Object | $$UnknownObject | $$Record)[],
>(...objectSchemas: Ts): SchemarAndN<Ts> {
	$fastAssert(defaultObjectOptions)
	const o: ObjectOptions = { ...defaultObjectOptions }

	// todo - add generic (polymorphic?) function to handle options merging
	for (const nextObject of objectSchemas) {
		$AssumeType<Get$<typeof nextObject>>(nextObject)

		const oo: SchemaOptions = nextObject[OPTIONS]

		o.isOptional &&= oo.isOptional
		o.isStrictOptional &&= oo.isStrictOptional

		o.isReadonly &&= oo.isReadonly

		o.customOperations = [...o.customOperations, ...oo.customOperations]
		o.customFixes = [...o.customFixes, ...oo.customFixes]

		o.hasDefault ||= oo.hasDefault

		if (o.hasDefault) {
			if (o.getDefault || oo.getDefault) {
				// put do not reference via the `o` and `oo` variables
				const oDefault = o.default
				const ooDefault = oo.default

				const oGetDefault = o.getDefault
				const ooGetDefault = oo.getDefault

				o.getDefault = () => {
					return {
						...((oGetDefault ? oGetDefault() : oDefault) as object),
						...((ooGetDefault ? ooGetDefault() : ooDefault) as object),
					}
				}
				// eslint-disable-next-line sonarjs/no-undefined-assignment
				o.default = undefined
			} else {
				o.default = {
					...(o.default as object),
					...(oo.default as object),
				}
			}
		}

		if (is$$RecordSchema(nextObject)) {
			$AssumeType<RecordOptions>(oo)
			const { keySchema, valueSchema } = oo
			o.indexSignatures = [...o.indexSignatures, { keySchema, valueSchema }]
		} else if (isUnknownObjectSchema(nextObject)) {
			$AssumeType<UnknownObjectOptions>(oo)
			o.isPlain &&= oo.isPlain
		} else if (is$$ObjectSchema(nextObject)) {
			$AssumeType<ObjectOptions>(oo)
			o.shape = { ...o.shape, ...oo.shape }
			o.indexSignatures = [...o.indexSignatures, ...oo.indexSignatures]
			o.isPlain &&= oo.isPlain
		} else throw new Error('not implemented')
	}

	return new CustomObjectImpl(o) as never
}

export const intersection = and
