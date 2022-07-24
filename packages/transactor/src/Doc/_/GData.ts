// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetInputType, GetType } from '@voltiso/schemar'

import type { IRef } from '../../Ref'
import type { Relax } from '../../Relax'
import type { DTI, IDocTI } from '../DocTI.js'
import type { IDoc } from '../IDoc.js'
import type { IntrinsicFields } from './IntrinsicFields.js'

type OmitId<T> = T extends unknown
	? {
			[k in keyof T as k extends 'id' ? never : k]: T[k]
	  }
	: never

export type GData<TI extends IDocTI> = OmitId<
	GetType<TI['const'] & TI['public'] & TI['private'] & TI['protected']> &
		IntrinsicFields
>

export type GDataInput<TI extends IDocTI> = OmitId<
	GetInputType<TI['const'] & TI['public'] & TI['private'] & TI['protected']>
>

export type GDataPublic<TI extends IDocTI> = OmitId<GetType<TI['public']>>

type RelaxRefs<X> = X extends IRef
	? Relax<X>
	: X extends object
	? {
			[k in keyof X]: RelaxRefs<X[k]>
	  }
	: X

type GDataPublicInput_<X extends IDocTI> = RelaxRefs<
	OmitId<GetInputType<X['const'] & X['public']>>
>

export type GDataPublicInput<X extends IDoc | IDocTI> = X extends IDoc
	? GDataPublicInput_<X[DTI]>
	: X extends IDocTI
	? GDataPublicInput_<X>
	: never
