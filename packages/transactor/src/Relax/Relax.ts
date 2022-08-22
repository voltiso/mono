// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTI, DTI, IDoc } from '~/Doc'
import type { IRef } from '~/Ref'

type RelaxDoc<D extends IDoc> = IDoc &
	Pick<D, Exclude<keyof IDoc, 'methods' | 'id' | 'ref' | 'update' | DTI>> & {
		[DTI]: RelaxDocTI<D[DTI]>
	}

type RelaxDocTI<TI extends DocTI> = DocTI & Omit<TI, 'methods'>

type RelaxRef<R extends IRef> = R

export type Relax<X extends IDoc | DocTI | IRef> = X extends IDoc
	? RelaxDoc<X>
	: X extends DocTI
	? RelaxDocTI<X>
	: X extends IRef
	? RelaxRef<X>
	: never
