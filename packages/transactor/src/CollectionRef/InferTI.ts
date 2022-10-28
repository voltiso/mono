// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, NewableReturn_ } from '@voltiso/util'
import type { $$DocConstructor, $$Doc, $$DocTI, DTI } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { InferMethods } from './InferMethods'

//

export type InferTIFromDoc_<D> = D extends $$Doc ? InferTIFromDoc<D> : never

export type InferTIFromDoc<D extends $$Doc> = Assume<
	$$DocTI,
	D extends { [DTI]: { tag: string } }
		? D[DTI] & {
				methods: InferMethods<D>
		  } & (undefined extends D[DTI]['tag'] ? { tag: undefined } : unknown)
		: never
>

export type InferTIFromCls<Cls extends $$DocConstructor> = InferTIFromDoc<
	NewableReturn_<Cls> & $$Doc
>

export type InferTI<X extends $$DocConstructor | $$Doc | DocTag> =
	X extends $$Doc
		? InferTIFromDoc<X>
		: X extends $$DocConstructor
		? InferTIFromCls<X>
		: X extends string
		? DocTypes[X] extends { readonly [DTI]: {} }
			? DocTypes[X][DTI]
			: never
		: never

export type GetTI<X extends $$DocTI | DocTag | { readonly [DTI]: $$DocTI }> =
	X extends $$DocTI
		? X
		: X extends { readonly [DTI]: $$DocTI }
		? X[DTI]
		: X extends DocTag
		? DocTypes[X] extends { readonly [DTI]: {} }
			? DocTypes[X][DTI]
			: never
		: never
