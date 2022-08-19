// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '@voltiso/util'

import type { DocConstructorLike, DocLike, DTI } from '~/Doc'

import type { InferMethods } from './InferMethods'

//

export type InferFromDoc<D extends DocLike> = Merge2_<D[DTI], { doc: D }> & {
	methods: InferMethods<D>
} & (undefined extends D[DTI]['tag'] ? { tag: undefined } : unknown)

export type InferFromCls<Cls extends DocConstructorLike> = InferFromDoc<
	InstanceType<Cls>
>

export type InferTI<X> = X extends DocConstructorLike
	? InferFromCls<X>
	: X extends DocLike
	? InferFromDoc<X>
	: never
