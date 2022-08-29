// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { If } from '@voltiso/util'

import type { InferableMutableTuple, InferableReadonlyTuple } from '~'

import type { Type_ } from './GetType'
import type { GetTypeOptions } from './GetTypeOptions'

export interface GetTupleTypeOptions extends GetTypeOptions {
	readonlyTuple: boolean
}

export type _TupleTypeImplRec<
	T,
	acc extends unknown[],
	O extends GetTupleTypeOptions,
> = T extends readonly []
	? If<O['readonlyTuple'], readonly [...acc], acc>
	: T extends readonly [infer h, ...infer t]
	? _TupleTypeImplRec<t, [...acc, Type_<h, O>], O>
	: T extends readonly (infer E)[]
	? _TupleTypeImplRec<[], [...acc, ...Type_<E, O>[]], O>
	: never

export type _TupleTypeImpl<
	T,
	O extends GetTupleTypeOptions,
> = _TupleTypeImplRec<T, [], O>

export type TupleType_<
	T,
	O extends GetTypeOptions & { readonlyTuple?: never } = { kind: 'out' },
> = InferableReadonlyTuple extends T
	? readonly unknown[]
	: InferableMutableTuple extends T
	? unknown[]
	: T extends unknown[]
	? _TupleTypeImpl<T, O & { readonlyTuple: false }>
	: T extends readonly unknown[]
	? _TupleTypeImpl<T, O & { readonlyTuple: true }>
	: never

export type $TupleType_<
	T,
	O extends GetTypeOptions & { readonlyTuple?: never } = { kind: 'out' },
> = T extends any ? (O extends any ? TupleType_<T, O> : never) : never
