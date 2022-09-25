// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocConstructorLike, DocLike, DTI } from '~/Doc'

import type { InferMethods } from './InferMethods'

//

export type InferTIFromDoc<D extends DocLike> = D[DTI] & {
	methods: InferMethods<D>
} & (undefined extends D[DTI]['tag'] ? { tag: undefined } : unknown)

export type InferTIFromCls<Cls extends DocConstructorLike> = InferTIFromDoc<
	InstanceType<Cls>
>

export type InferTI<X> = X extends DocConstructorLike
	? InferTIFromCls<X>
	: X extends DocLike
	? InferTIFromDoc<X>
	: never
