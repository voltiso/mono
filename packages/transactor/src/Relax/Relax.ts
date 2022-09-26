// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTI, DTI, IDoc } from '~/Doc'
import type { IRef, IS_DOC_REF } from '~/Ref'

export type RelaxDoc<D extends IDoc> = IDoc &
	Pick<D, Exclude<keyof IDoc, 'methods' | 'id' | 'ref' | 'update' | DTI>> & {
		[DTI]: RelaxDocTI<D[DTI]>
	}

export type RelaxDocTI<TI extends DocTI> = DocTI & Omit<TI, 'methods'>

export type RelaxRef<R extends IRef> = IRef &
	Pick<R, IS_DOC_REF | 'Exists' | DTI>

export type Relax<X extends IDoc | DocTI | IRef> = X extends IDoc
	? RelaxDoc<X>
	: X extends DocTI
	? RelaxDocTI<X>
	: X extends IRef
	? RelaxRef<X>
	: never
