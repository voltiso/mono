// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DTI, IDoc, IDocConstructorNoBuilder } from '~/Doc'

// type _InferFields2<F, D extends IDoc> = _<{
// 	[k in keyof F]: k extends keyof D
// 		? D[k] extends IDocRef | undefined
// 			? IsOptional<
// 					D,
// 					k,
// 					SOptional<s.DocRef<Exclude<Exclude<D[k], undefined>[DTI]['doc'], undefined>>>,
// 					s.DocRef<Exclude<Exclude<D[k], undefined>[DTI]['doc'], undefined>>
// 			  >
// 			: F[k]
// 		: F[k]
// }>

// type _InferFields<TI extends IDocTI, D extends IDoc> = {
// 	public: _InferFields2<TI['public'], D>
// 	private: _InferFields2<TI['private'], D>
// 	const: _InferFields2<TI['const'], D>
// 	protected: _InferFields2<TI['protected'], D>
// }

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
