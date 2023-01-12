// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_, If } from '@voltiso/util'

import type { InferableMutableTuple, InferableReadonlyTuple, Rest } from '~'

import type { Type_ } from './GetType'
import type { DefaultGetTypeOptions, GetTypeOptions } from './GetTypeOptions'

export interface GetTupleTypeOptions extends GetTypeOptions {
	readonlyTuple: boolean
}

export type _TupleTypeImplRec<
	T,
	acc extends unknown[],
	O extends GetTupleTypeOptions,
> = T extends readonly []
	? If<O['readonlyTuple'], readonly [...acc], acc>
	: T extends readonly [...Rest<infer R>[]]
	? _TupleTypeImplRec<[], [...acc, ...Type_<R, O>[]], O>
	: T extends readonly [infer h, ...infer t]
	? _TupleTypeImplRec<t, [...acc, Type_<h, O>], O>
	: T extends readonly (infer E)[]
	? _TupleTypeImplRec<[], [...acc, ...Type_<E, O>[]], O>
	: never

export type _TupleTypeImpl<
	T,
	PartialOptions extends Partial<GetTupleTypeOptions>,
> = _TupleTypeImplRec<T, [], $Override_<DefaultGetTypeOptions, PartialOptions>>

export type TupleType_<
	T,
	PartialOptions extends Partial<GetTypeOptions> & {
		readonlyTuple?: never
	} = {},
> = InferableMutableTuple extends T
	? InferableReadonlyTuple extends T
		? readonly unknown[]
		: unknown[]
	: T extends unknown[]
	? _TupleTypeImpl<T, PartialOptions & { readonlyTuple: false }>
	: T extends readonly unknown[]
	? _TupleTypeImpl<T, PartialOptions & { readonlyTuple: true }>
	: never

export type $TupleType_<
	T,
	PartialOptions extends Partial<GetTypeOptions> & {
		readonlyTuple?: never
	} = {},
> = T extends any
	? PartialOptions extends any
		? TupleType_<T, PartialOptions>
		: never
	: never
