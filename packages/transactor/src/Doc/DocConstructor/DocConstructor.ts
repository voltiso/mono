// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import type {
	_,
	Merge2Reverse_,
	OmitSignatures,
	OmitValues,
	Throw,
	Get_,
	NewableReturn_,
} from '@voltiso/util'

import type { AggregatorHandlers_ } from '~/Aggregator'
import type {
	Doc,
	DocBuilderPluginLike,
	$$DocConstructor,
	DocContext,
	DocTI,
	$$DocTI,
	DTI,
	Promisify,
	$$Doc,
} from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'
import type { GI, GO } from '~/Doc/_/GDoc'
import type { NewFieldsLike } from '~/Doc/_/NewFields'
import type { DocBuilderPluginResult } from '~/DocBuilderPluginResult-module-augmentation'
import type { DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'

/** Helpers */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DocConstructor {
	export type MaybeWithName<Params> = [Params] | [string, Params]

	export type WithOverrides<Old extends $$DocTI, New extends Partial<DocTI>> = [
		DocConstructor<Merge2Reverse_<Required<New>, Old>>,
	][0]

	export type MapNewFields<
		TI extends $$DocTI,
		F extends NewFieldsLike,
	> = TI extends {
		publicOnCreation: any
		public: any
		private: any
		aggregates: any
	}
		? OmitValues<
				{
					publicOnCreation: 'publicOnCreation' extends keyof F
						? t.CustomObject.WithAnd<
								TI['publicOnCreation'],
								F['publicOnCreation']
						  >
						: never

					public: 'public' extends keyof F
						? t.CustomObject.WithAnd<TI['public'], F['public']>
						: never

					private: 'private' extends keyof F
						? t.CustomObject.WithAnd<TI['private'], F['private']>
						: never

					id: 'id' extends keyof F ? F['id'] : never

					aggregates: 'aggregates' extends keyof F
						? Merge2Reverse_<F['aggregates'], TI['aggregates']>
						: never
				},
				never
		  >
		: never
}

export type DocConstructor<TI extends $$DocTI> = TI extends DocTI
	? _DocConstructor<TI>
	: never

export interface _DocConstructor<TI extends DocTI = DocTI> {
	readonly [DTI]: TI
	readonly _: DocDerivedData

	new (context: DocContext, data: GetInputData<TI>): Doc<TI, 'outside'>

	// <Derived>(): DocConstructor<___<Merge2<TI, { doc: Derived & DocU }>>>
	<Tag extends DocTag>(tag: Tag): DocConstructor.WithOverrides<TI, { tag: Tag }>

	<F extends NewFieldsLike>(f: F): keyof F extends keyof NewFieldsLike
		? DocConstructor.WithOverrides<TI, DocConstructor.MapNewFields<TI, F>>
		: Throw<'unknown keys:' & { keys: Exclude<keyof F, keyof NewFieldsLike> }>

	tag<Tag extends DocTag>(
		tag: Tag,
	): DocConstructor.WithOverrides<TI, { tag: Tag }>

	fields<F extends NewFieldsLike>(
		f: F,
	): keyof F extends keyof NewFieldsLike
		? DocConstructor.WithOverrides<TI, DocConstructor.MapNewFields<TI, F>>
		: Throw<'unknown keys:' & { keys: Exclude<keyof F, keyof NewFieldsLike> }>

	publicOnCreation<S extends Record<string, t.Schemable>>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapNewFields<TI, { publicOnCreation: S }>
	>

	public<S extends t.SchemableObjectLike>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapNewFields<TI, { public: S }>
	>

	private<S extends Record<string, t.Schemable>>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapNewFields<TI, { private: S }>
	>

	after(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>>>
	): DocConstructor<TI>

	afterUpdate(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, true, true>>
	): DocConstructor<TI>

	afterCreateOrUpdate(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, boolean, true>>
	): DocConstructor<TI>

	afterCreate(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, false, true>>
	): DocConstructor<TI>

	afterDelete(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, true, false>>
	): DocConstructor<TI>

	beforeCommit(
		...args: DocConstructor.MaybeWithName<BeforeCommitTrigger<GI<TI>>>
	): DocConstructor<TI>

	/** @deprecated Use `@method` decorator instead */
	method: <N extends string, M extends Method<GO<TI>, any[]>>(
		name: N,
		m: M,
	) => DocConstructor<_<TI & { methods: { [key in N]: Promisify<M> } }>>

	/** Apply custom plugin */
	with<Plugin extends DocBuilderPluginLike<TI['tag']>>(
		plugin: Plugin,
	): Plugin['name'] extends keyof OmitSignatures<DocBuilderPluginResult>
		? DocConstructor<DocBuilderPluginResult<TI>[Plugin['name']]>
		: DocConstructor<TI>

	/**
	 * - Use `aggregate` plugin instead if facing recursive types issues
	 * - Because of better modular design and tree-shaking, this will probably be
	 *   deprecated in favor of `with(aggregate(...))` plugin
	 */
	aggregateInto<
		Target extends $$DocConstructor,
		Name extends string & keyof Get_<Get_<Target, DTI>, 'aggregates'>,
	>(
		target: Target,
		name: Name,
		handlers: AggregatorHandlers_<TI, NewableReturn_<Target> & $$Doc, Name>,
	): DocConstructor<TI>

	get schemaWithoutId(): t.CustomObject.WithAnd<
		TI['publicOnCreation'],
		t.CustomObject.WithAnd<TI['public'], TI['private']>
	>

	get schemaWithId(): t.CustomObject.WithAnd<
		t.CustomObject.WithAnd<
			TI['publicOnCreation'],
			t.CustomObject.WithAnd<TI['public'], TI['private']>
		>,
		{ id: TI['id'] extends t.SchemaLike<string> ? TI['id'] : t.String }
	>

	// t.Object<
	// 	$_<
	// 		{
	// 			id: TI['id'] extends t.SchemaLike<string> ? TI['id'] : t.String
	// 		} & TI['publicOnCreation'] &
	// 			TI['public'] &
	// 			TI['private']
	// 	>
	// >

	get idSchema(): TI['id'] extends t.SchemaLike<string> ? TI['id'] : t.String
	// get idSchema(): unknown extends TI['id'] ? t.String : TI['id']
}
