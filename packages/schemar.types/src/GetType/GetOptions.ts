// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '_'
import { $Assert, $dev } from '@voltiso/util'

import type {
	DefaultSchemaOptions,
	InferableLiteral,
	InferableObject,
	InferableTuple,
	SchemaOptions,
} from '~'

export type GetOptions<L> = L extends
	| InferableLiteral
	| InferableObject
	| InferableTuple
	? DefaultSchemaOptions
	: L extends { [OPTIONS]: SchemaOptions }
	? L[OPTIONS]
	: never

// eslint-disable-next-line etc/no-misused-generics
$dev(<L>() => {
	$Assert.is<GetOptions<L>, SchemaOptions>()
})
