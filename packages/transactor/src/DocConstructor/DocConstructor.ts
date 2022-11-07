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

import type { AggregatorHandlers } from '~/Aggregator'
import type {
	$$Doc,
	$$DocTI,
	$$PartialDocOptions,
	Doc,
	DocBase,
	DocBuilderPlugin,
	DocContext,
	DocTI,
	DTI,
	GetInputData,
	GO,
	Promisify,
} from '~/Doc'
import type { DocBuilderPluginResult } from '~/DocBuilderPluginResult-module-augmentation'
import type { $$DocRelated } from '~/DocRelated'
import type { AnyDoc, DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import type { AutoIdSchema } from '~/schemas'
import type { Trigger } from '~/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'
import type { IS_DOC_CONSTRUCTOR } from './IDocConstructor'

export interface DocConstructor<TI extends DocTI = DocTI> {
	readonly [IS_DOC_CONSTRUCTOR]: true

	readonly [DTI]: TI
	readonly _: DocDerivedData

	new (context: DocContext, data: GetInputData<TI>): Doc<TI>

	<Tag extends DocTag | AnyDoc>(tag: Tag): DocConstructor.WithTag<TI, Tag>
	// tag<Tag extends DocTag>(tag: Tag): DocConstructor.WithTag<TI, Tag>

	with<O extends $$PartialDocOptions>(
		options: O,
	): keyof O extends keyof $$PartialDocOptions
		? DocConstructor.WithOverrides<TI, DocConstructor.MapPartialOptions<TI, O>>
		: Throw<
				'unknown keys:' & { keys: Exclude<keyof O, keyof $$PartialDocOptions> }
		  >

	/** ⚠️ If possible, use call signature instead */
	publicOnCreation<S extends Record<string, t.Schemable>>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapPartialOptions<TI, { publicOnCreation: S }>
	>

	/** ⚠️ If possible, use call signature instead */
	public<S extends t.$$SchemableObject>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapPartialOptions<TI, { public: S }>
	>

	/** ⚠️ If possible, use call signature instead */
	private<S extends Record<string, t.Schemable>>(
		s: S,
	): DocConstructor.WithOverrides<
		TI,
		DocConstructor.MapPartialOptions<TI, { private: S }>
	>

	//

	//

	/** ⚠️ If possible, use `@after` decorator instead */
	after(trigger: Trigger.After<DocBase<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@after` decorator instead */
	after(name: string, trigger: Trigger.After<DocBase<TI, 'inside'>>): this

	/**
	 * ⚠️ If possible, use `@afterUpdate` decorator instead
	 *
	 * - Assignability issues - using DocBase instead (statically known fields only)
	 */
	afterUpdate(trigger: Trigger.AfterUpdate<DocBase<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@afterUpdate` decorator instead */
	afterUpdate(
		name: string,
		trigger: Trigger.AfterUpdate<DocBase<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@afterCreateOrUpdate` decorator instead */
	afterCreateOrUpdate(
		trigger: Trigger.AfterCreateOrUpdate<DocBase<TI, 'inside'>>,
	): this

	/** ⚠️ If possible, use `@afterCreateOrUpdate` decorator instead */
	afterCreateOrUpdate(
		name: string,
		trigger: Trigger.AfterCreateOrUpdate<DocBase<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@afterCreate` decorator instead */
	afterCreate(trigger: Trigger.AfterCreate<DocBase<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@afterCreate` decorator instead */
	afterCreate(
		name: string,
		trigger: Trigger.AfterCreate<DocBase<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@afterDelete` decorator instead */
	afterDelete(trigger: Trigger.AfterDelete<DocBase<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@afterDelete` decorator instead */
	afterDelete(
		name: string,
		trigger: Trigger.AfterDelete<DocBase<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@beforeCommit` decorator instead */
	beforeCommit(trigger: Trigger.BeforeCommit<DocBase<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@beforeCommit` decorator instead */
	beforeCommit(
		name: string,
		trigger: Trigger.BeforeCommit<DocBase<TI, 'inside'>>,
	): this

	//

	//

	/** ⚠️ If possible, use `@method` decorator instead */
	method: <N extends string, M extends Method<GO<TI>>>(
		name: N,
		method: M,
	) => DocConstructor<_<TI & { methods: { [key in N]: Promisify<M> } }>>

	/** Apply custom plugin */
	withPlugin<Plugin extends DocBuilderPlugin<TI['tag']>>(
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
		Target extends $$DocRelated,
		Name extends string & keyof Get_<Get_<Target, DTI>, 'aggregates'>,
	>(
		/** Unused - type inference only */
		_target: Target,
		name: Name,
		handlers: AggregatorHandlers<TI, NewableReturn_<Target> & $$Doc, Name>,
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

	get idSchema(): TI['id'] extends t.SchemaLike<string>
		? TI['id']
		: AutoIdSchema<this['_']['tag']>
}

//

//

//

/** Helpers */
export namespace DocConstructor {
	export type WithTag<
		TI extends DocTI,
		tag extends DocTag | AnyDoc,
	> = WithOverrides<TI, { tag: tag }>

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
