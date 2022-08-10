// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '@voltiso/util'

import type { DTI, IDoc, IDocConstructor } from '~/Doc'

import type { InferMethods } from './InferMethods'

type InferFromDoc<D extends IDoc> = Merge2_<
	D[DTI],
	{
		doc: D
	} // & InferFields<D>
> & {
	methods: InferMethods<D>
} & (undefined extends D[DTI]['tag'] ? { tag: undefined } : unknown)

type InferFromCls<Cls extends IDocConstructor> = InferFromDoc<InstanceType<Cls>>

export type InferTI<X> = X extends IDocConstructor
	? InferFromCls<X>
	: X extends IDoc
	? InferFromDoc<X>
	: never
