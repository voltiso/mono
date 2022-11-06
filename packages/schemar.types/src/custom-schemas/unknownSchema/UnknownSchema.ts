// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { InferSchema_ } from '~/InferSchema'
import type { ISchema, SimplifySchema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

import type { CustomUnknownSchema } from './CustomUnknownSchema'

export interface InferAndSimplifyFunction {
	<S extends $$Schemable>(schemable: S): S extends any
		? SimplifySchema<InferSchema_<S>>
		: never
}

export type UnknownSchemaConstructor = new () => UnknownSchema

export interface UnknownSchema
	extends CustomUnknownSchema<{}>,
		InferAndSimplifyFunction {}

export function test<S extends readonly $$Schemable[]>() {
	type A = SimplifySchema<InferSchema_<S>>

	$Assert.is<A, ISchema>()
}
