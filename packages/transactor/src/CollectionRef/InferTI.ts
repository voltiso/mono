// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocConstructorLike, DocLike, DocTILike, DTI } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { InferMethods } from './InferMethods'

//

export type InferTIFromDoc<D extends DocLike> = D[DTI] & {
	methods: InferMethods<D>
} & (undefined extends D[DTI]['tag'] ? { tag: undefined } : unknown)

export type InferTIFromCls<Cls extends DocConstructorLike> = InferTIFromDoc<
	InstanceType<Cls>
>

export type InferTI<X extends DocConstructorLike | DocLike | DocTag> =
	X extends DocConstructorLike
		? InferTIFromCls<X>
		: X extends DocLike
		? InferTIFromDoc<X>
		: X extends DocTag
		? DocTypes[X] extends { readonly [DTI]: any }
			? DocTypes[X][DTI]
			: never
		: never

export type GetTI<
	X extends DocTILike | DocTag | { readonly [DTI]: DocTILike },
> = X extends DocTILike
	? X
	: X extends { readonly [DTI]: DocTILike }
	? X[DTI]
	: X extends DocTag
	? DocTypes[X] extends { readonly [DTI]: any }
		? DocTypes[X][DTI]
		: never
	: never
