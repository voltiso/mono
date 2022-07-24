// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Trivial } from '@voltiso/util'

import type { DTI, IDoc, IDocConstructor } from '../Doc'
import type { InferMethods } from './InferMethods.js'

type InferFromDoc<D extends IDoc> = Merge2Trivial<
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
