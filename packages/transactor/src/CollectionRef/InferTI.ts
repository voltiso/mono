// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, NewableReturn_ } from '@voltiso/util'

import type { $$Doc, $$DocTI, DocTI, DTI } from '~/Doc'
import type { $$DocConstructor } from '~/DocConstructor'
import type { $$DocRelatedLike, GetDoc } from '~/DocRelated'
import type { ANY_DOC, DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'

import type { InferMethods } from './InferMethods'

//

export type InferTI<X extends $$DocRelatedLike> = InferTI.FromAnything<X>

export namespace InferTI {
	export type FromAnything<X extends $$DocRelatedLike> = FromDoc<GetDoc<X>>

	export type FromDoc<D extends $$Doc> = D extends {
		[DTI]: DocTI
	}
		? $$DocTI &
				_<
					D[DTI] & {
						methods: InferMethods<D>
					} & (ANY_DOC extends D[DTI]['tag'] ? { tag: ANY_DOC } : unknown)
				>
		: DocTI

	export type FromCls<Cls extends $$DocConstructor> = FromDoc<
		NewableReturn_<Cls> & $$Doc
	>
}

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
