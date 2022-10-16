// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '_'
import type { _, IsCompatible, IsIdentical } from '@voltiso/util'

import type { InferSchema_, SchemableLike } from '~'

import type { CustomSchema, ISchema, SchemaLike, SimpleSchema } from '.'

/** @inline */
export type CanBeSimpleSchema<
	S extends {
		OutputType: any
		InputType: any
		[OPTIONS]: any
	},
	True = true,
	False = false,
> = true extends S[OPTIONS]['isOptional']
	? False
	: true extends S[OPTIONS]['isReadonly']
	? False
	: false extends IsCompatible<S['OutputType'], S['InputType']>
	? False
	: True

/** @inline */
export type Simplify<S extends SchemableLike> = SimplifySchema<InferSchema_<S>>

/** @inline */
export type SimplifySchema<
	This extends {
		OutputType: any
		InputType: any
		[OPTIONS]: any
	},
> = SchemaLike<never> extends This
	? This
	: ISchema<never> extends This
	? This
	: CanBeSimpleSchema<This> extends true
	? SimpleSchema<This[OPTIONS]['Output']>
	: CustomSchema<
			_<
				(This[OPTIONS]['isOptional'] extends false
					? {}
					: { isOptional: This[OPTIONS]['isOptional'] }) &
					(This[OPTIONS]['isReadonly'] extends false
						? {}
						: { isReadonly: This[OPTIONS]['isReadonly'] }) &
					(This[OPTIONS]['hasDefault'] extends false
						? {}
						: { hasDefault: This[OPTIONS]['hasDefault'] }) &
					IsIdentical<
						This['OutputType'],
						unknown,
						unknown,
						{ Output: This['OutputType'] }
					> &
					IsIdentical<
						This['InputType'],
						unknown,
						unknown,
						{ Input: This['InputType'] }
					>
			>
	  >
