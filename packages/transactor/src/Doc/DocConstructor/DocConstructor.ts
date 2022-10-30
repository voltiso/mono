// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import type {
	_,
	Get_,
	Merge2Reverse_,
	NewableReturn_,
	OmitSignatures,
	OmitValues,
	Throw,
} from '@voltiso/util'

import type { AggregatorHandlers_ } from '~/Aggregator'
import type {
	$$Doc,
	$$DocConstructor,
	$$DocTI,
	Doc,
	DocBuilderPluginLike,
	DocContext,
	DocTI,
	DTI,
	IS_DOC_CONSTRUCTOR,
	Promisify,
} from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'
import type { GI, GO } from '~/Doc/_/GDoc'
import type { $$PartialDocOptions } from '~/Doc/_/NewFields'
import type { DocBuilderPluginResult } from '~/DocBuilderPluginResult-module-augmentation'
import type { DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'

export interface DocConstructor<TI extends DocTI = DocTI> {
	readonly [IS_DOC_CONSTRUCTOR]: true

	readonly [DTI]: TI
	readonly _: DocDerivedData

	new (context: DocContext, data: GetInputData<TI>): Doc<TI>

	<Tag extends DocTag>(tag: Tag): DocConstructor.WithOverrides<TI, { tag: Tag }>

	<O extends $$PartialDocOptions>(
		options: O,
	): keyof O extends keyof $$PartialDocOptions
		? DocConstructor.WithOverrides<TI, DocConstructor.MapPartialOptions<TI, O>>
		: Throw<
				'unknown keys:' & { keys: Exclude<keyof O, keyof $$PartialDocOptions> }
		  >

	tag<Tag extends DocTag>(
		tag: Tag,
	): DocConstructor.WithOverrides<TI, { tag: Tag }>

	publicOnCreation<S extends Record<string, t.Schemable>>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapPartialOptions<TI, { publicOnCreation: S }>
	>

	public<S extends t.$$SchemableObject>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapPartialOptions<TI, { public: S }>
	>

	private<S extends Record<string, t.Schemable>>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapPartialOptions<TI, { private: S }>
	>

	after(...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>>>): this

	afterUpdate(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, true, true>>
	): this

	afterCreateOrUpdate(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, boolean, true>>
	): this

	afterCreate(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, false, true>>
	): this

	afterDelete(
		...args: DocConstructor.MaybeWithName<AfterTrigger<GI<TI>, true, false>>
	): this

	beforeCommit(
		...args: DocConstructor.MaybeWithName<BeforeCommitTrigger<GI<TI>>>
	): this

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
		: this

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
	): this

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

	get idSchema(): TI['id'] extends t.SchemaLike<string> ? TI['id'] : t.String
}

//

//

//

/** Helpers */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DocConstructor {
	export type MaybeWithName<Params> = [Params] | [string, Params]

	export type WithOverrides<Old extends DocTI, New extends Partial<DocTI>> = [
		DocConstructor<Merge2Reverse_<Required<New>, Old>>,
	][0]

	export type MapPartialOptions<
		TI extends $$DocTI,
		O extends $$PartialDocOptions,
	> = TI extends {
		publicOnCreation: t.$$Object
		public: t.$$Object
		private: t.$$Object
		aggregates: {}
	}
		? OmitValues<
				{
					tag: 'tag' extends keyof O ? O['tag'] : never
					id: 'id' extends keyof O ? O['id'] : never

					publicOnCreation: 'publicOnCreation' extends keyof O
						? t.CustomObject.WithAnd<
								TI['publicOnCreation'],
								O['publicOnCreation']
						  >
						: never

					public: 'public' extends keyof O
						? t.CustomObject.WithAnd<TI['public'], O['public']>
						: never

					private: 'private' extends keyof O
						? t.CustomObject.WithAnd<TI['private'], O['private']>
						: never

					aggregates: 'aggregates' extends keyof O
						? Merge2Reverse_<O['aggregates'], TI['aggregates']>
						: never
				},
				never
		  >
		: never
}
