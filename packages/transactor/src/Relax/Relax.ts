// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocLike, DocTI, DocTILike, DTI, IDoc } from '~/Doc'
import type { DocRefBaseLike, IDocRefBase, IS_DOC_REF } from '~/DocRef'

export type RelaxDoc<D extends DocLike> = IDoc &
	Pick<D, Exclude<keyof D, 'methods' | 'id' | 'ref' | 'update' | DTI>> & {
		[DTI]: RelaxDocTI<D[DTI]>
	}

export type RelaxDocTI<TI extends DocTILike> = DocTI & Omit<TI, 'methods'>

export type RelaxRef<R extends DocRefBaseLike> = IDocRefBase &
	Pick<R, IS_DOC_REF | 'Exists' | DTI>

export type Relax<X extends DocLike | DocTI | DocRefBaseLike> =
	X extends DocLike
		? RelaxDoc<X>
		: X extends DocTI
		? RelaxDocTI<X>
		: X extends DocRefBaseLike
		? RelaxRef<X>
		: never
