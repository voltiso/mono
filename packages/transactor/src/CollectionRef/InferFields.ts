// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DTI, IDoc } from '~/Doc'
import type { IDocConstructorNoBuilder } from '~/DocConstructor'

type _InferFields<TI, _D> = TI

type _InferFieldsFromCls<Cls extends IDocConstructorNoBuilder> = _InferFields<
	Cls[DTI],
	InstanceType<Cls>
>

export type InferFields<X> = X extends IDocConstructorNoBuilder
	? _InferFieldsFromCls<X>
	: X extends IDoc
	? _InferFields<X[DTI], X>
	: never
