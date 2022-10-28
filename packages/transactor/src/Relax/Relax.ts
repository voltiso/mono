// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Doc, DocTI, $$DocTI, DTI, IDoc } from '~/Doc'
import type { $$DocRef, IDocRef, IS_DOC_REF } from '~/DocRef'

export type RelaxDoc<D extends $$Doc> = IDoc &
	Pick<D, Exclude<keyof D, 'methods' | 'id' | 'ref' | 'update' | DTI>> & {
		[DTI]: RelaxDocTI<D[DTI]>
	}

export type RelaxDocTI<TI extends $$DocTI> = DocTI & Omit<TI, 'methods'>

export type RelaxRef<R extends $$DocRef> = IDocRef &
	Pick<R, IS_DOC_REF | 'Exists' | DTI>

export type Relax<X extends $$Doc | DocTI | $$DocRef> = X extends $$Doc
	? RelaxDoc<X>
	: X extends DocTI
	? RelaxDocTI<X>
	: X extends $$DocRef
	? RelaxRef<X>
	: never
