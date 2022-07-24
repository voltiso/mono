// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'
import type { _, Merge2 } from '@voltiso/util'

import type { DataWithoutId } from '../../Data'
import type { DocTag } from '../../DocTypes'
import type { Method } from '../../Method'
import type { AfterTrigger, BeforeCommitTrigger } from '../../Trigger'
import type { Context } from '..'
import type { GDataInput, GI, GO, Promisify } from '../_'
import type { DTI, IDocTI } from '../DocTI'
import type { DocDerivedData, NewFields } from './_'
import type { MergeTI } from './_/MergeTI'

type MaybeWithName<Params> = [Params] | [string, Params]

type ___<X extends IDocTI> = DocConstructor<MergeTI<X>>

export interface DocConstructor<TI extends IDocTI = IDocTI> {
	[DTI]: TI
	_: DocDerivedData

	new (context: Context, data: DataWithoutId<GDataInput<TI>>): GO<TI>

	// <Derived>(): DocConstructor<___<Merge2<TI, { doc: Derived & DocU }>>>
	<Tag extends DocTag>(tag: Tag): ___<Merge2<TI, { tag: Tag }>>
	<F extends NewFields>(f: F): ___<TI & F>

	tag<Tag extends DocTag>(tag: Tag): ___<Merge2<TI, { tag: Tag }>>
	fields<F extends NewFields>(f: F): ___<TI & F>

	const<S extends Record<string, s.Schemable>>(s: S): ___<TI & { const: S }>
	public<S extends Record<string, s.Schemable>>(s: S): ___<TI & { public: S }>
	private<S extends Record<string, s.Schemable>>(s: S): ___<TI & { private: S }>
	protected<S extends Record<string, s.Schemable>>(
		s: S,
	): ___<TI & { protected: S }> // TypeofDoc<_<Omit<TI, 'protected'> & { protected: _<TI['protected'] & S> }>>

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

	method: <N extends string, M extends Method<GO<TI>, any[]>>(
		name: N,
		m: M,
	) => DocConstructor<_<TI & { methods: { [key in N]: Promisify<M> } }>>

	schemaWithoutId: s.Object<
		TI['const'] & TI['public'] & TI['private'] & TI['protected']
	>
	schemableWithoutId: TI['const'] &
		TI['public'] &
		TI['private'] &
		TI['protected']

	schemaWithId: s.Object<
		Omit<TI['const'] & TI['public'] & TI['private'] & TI['protected'], 'id'> & {
			id: s.String
		}
	>
	schemableWithId: _<
		Omit<TI['const'] & TI['public'] & TI['private'] & TI['protected'], 'id'> & {
			id: s.String
		}
	>
}
