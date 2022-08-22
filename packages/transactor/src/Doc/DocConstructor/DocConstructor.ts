// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject } from '@voltiso/schemar'
import type * as s from '@voltiso/schemar'
import type { _, Assume, Merge2, Throw } from '@voltiso/util'

import type { DocConstructorLike, NestedData } from '~'
import type { AggregatorHandlers } from '~/Aggregator'
import type { Doc, DocContext, DocTI, DTI } from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'
import type { GI, GO } from '~/Doc/_/GDoc'
import type { Promisify } from '~/Doc/_/GMethodPromises'
import type { NewFields } from '~/Doc/_/NewFields'
import type { DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'
import type { $MergeTI } from './_/MergeTI'

type MaybeWithName<Params> = [Params] | [string, Params]

type ___<X extends DocTI> = X extends any ? DocConstructor<$MergeTI<X>> : never

export interface DocConstructor<TI extends DocTI = DocTI> {
	[DTI]: TI
	_: DocDerivedData

	new (context: DocContext, data: GetInputData<TI>): Doc<TI, 'outside'>

	// <Derived>(): DocConstructor<___<Merge2<TI, { doc: Derived & DocU }>>>
	<Tag extends DocTag>(tag: Tag): ___<Merge2<TI, { tag: Tag }>>
	<F extends NewFields>(f: F): keyof F extends keyof NewFields
		? ___<TI & F>
		: Throw<'unknown keys:' & { keys: Exclude<keyof F, keyof NewFields> }>

	tag<Tag extends DocTag>(tag: Tag): ___<Merge2<TI, { tag: Tag }>>
	fields<F extends NewFields>(f: F): ___<TI & F>

	publicOnCreation<S extends Record<string, s.Schemable>>(
		s: S,
	): ___<TI & { publicOnCreation: S }>

	public<S extends Record<string, s.Schemable>>(s: S): ___<TI & { public: S }>
	private<S extends Record<string, s.Schemable>>(s: S): ___<TI & { private: S }>

	after(
		...args: MaybeWithName<AfterTrigger<GI<TI>, GI<TI> | null>>
	): DocConstructor<TI>

	afterUpdate(
		...args: MaybeWithName<AfterTrigger<GI<TI>, GI<TI>, true, true>>
	): DocConstructor<TI>

	afterCreateOrUpdate(
		...args: MaybeWithName<AfterTrigger<GI<TI>, GI<TI>, boolean, true>>
	): DocConstructor<TI>

	afterCreate(
		...args: MaybeWithName<AfterTrigger<GI<TI>, GI<TI>, false, true>>
	): DocConstructor<TI>

	afterDelete(
		...args: MaybeWithName<AfterTrigger<GI<TI>, null, true, false>>
	): DocConstructor<TI>

	beforeCommit(
		...args: MaybeWithName<BeforeCommitTrigger<GI<TI>>>
	): DocConstructor<TI>

	/** @deprecated Use `@method` decorator instead */
	method: <N extends string, M extends Method<GO<TI>, any[]>>(
		name: N,
		m: M,
	) => DocConstructor<_<TI & { methods: { [key in N]: Promisify<M> } }>>

	aggregate<
		Target extends DocConstructorLike,
		Name extends keyof Target[DTI]['aggregates'],
		// eslint-disable-next-line etc/no-misused-generics
		InitialValue extends NestedData
	>(
		targetDoc: Target,
		name: Name,
		handlers: AggregatorHandlers<this, Target, Name, InitialValue>,
	): DocConstructor<TI>

	schemaWithoutId: s.Object<
		Assume<
			InferableObject,
			TI['publicOnCreation'] & TI['public'] & TI['private']
		>
	>

	schemableWithoutId: TI['publicOnCreation'] & TI['public'] & TI['private']

	schemaWithId: s.Object<
		TI['publicOnCreation'] &
			TI['public'] &
			TI['private'] & {
				id: s.String
			}
	>

	schemableWithId: _<
		TI['publicOnCreation'] &
			TI['public'] &
			TI['private'] & {
				id: s.String
			}
	>
}
