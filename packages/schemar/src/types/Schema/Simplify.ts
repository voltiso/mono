// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, IsIdentical, OPTIONS } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	CustomSchema,
	InferSchema_,
	ISchema,
	SimpleSchema,
} from '~'

/** @inline */
export type CanBeSimpleSchema<S> = S extends {
	readonly Output: unknown
	readonly Input: unknown

	readonly isOptional: unknown
	readonly isReadonly: unknown
}
	? true extends S['isOptional']
		? false
		: true extends S['isReadonly']
		? false
		: /** `IsCompatible` returns `true` here for some reason */
		false extends IsIdentical<S['Output'], S['Input']>
		? false
		: true
	: never

/** @inline */
export type Simplify<S extends $$Schemable> = SimplifySchema<InferSchema_<S>>

/** @inline */
export type SimplifySchema<S extends $$Schema> = S extends {
	readonly Output: unknown
	readonly Input: unknown

	[OPTIONS]: unknown
	readonly isOptional: boolean
	readonly isReadonly: boolean
	readonly hasDefault: boolean
}
	? $$Schema extends S
		? S
		: ISchema<never> extends S
		? S
		: CanBeSimpleSchema<S> extends true
		? SimpleSchema<S['Output']>
		: CustomSchema<
				_<
					(S['isOptional'] extends false
						? {}
						: { isOptional: S['isOptional'] }) &
						(S['isReadonly'] extends false
							? {}
							: { isReadonly: S['isReadonly'] }) &
						(S['hasDefault'] extends false
							? {}
							: { hasDefault: S['hasDefault'] }) &
						IsIdentical<
							S['Output'],
							unknown,
							unknown,
							{ Output: S['Output'] }
						> &
						IsIdentical<S['Input'], unknown, unknown, { Input: S['Input'] }>
				>
		  >
	: never
