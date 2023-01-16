// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'
import type {
	_,
	Get_,
	IsIdentical,
	OmitByValue,
	OmitSignatures,
	Override,
	Throw,
} from '@voltiso/util'

import type { AggregatorHandlers } from '~/Aggregator'
import type {
	$$DocTI,
	$$PartialDocOptions,
	CustomDoc,
	Doc,
	DocBuilderPlugin,
	DocContext,
	DocTI,
	DTI,
	GetInputData,
	GO,
	Promisify,
} from '~/Doc'
import type { DocBuilderPluginResult } from '~/DocBuilderPluginResult-module-augmentation'
import type { GetDocTag } from '~/DocRelated/GetDocTag'
import type { AnyDoc, DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import type { AutoIdSchema } from '~/schemas'
import type { Trigger } from '~/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'
import type { $$DocConstructor } from './IDocConstructor'

export interface DocConstructor<TI extends DocTI = DocTI>
	extends $$DocConstructor {
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

	// /** ⚠️ If possible, use call signature instead */
	// publicOnCreation<S extends Record<string, t.Schemable>>(
	// 	s: S,
	// ): DocConstructor.WithOverrides<
	// 	TI,
	// 	DocConstructor.MapPartialOptions<TI, { publicOnCreation: S }>
	// >

	// /** ⚠️ If possible, use call signature instead */
	// public<S extends t.$$SchemableObject>(
	// 	s: S,
	// ): DocConstructor.WithOverrides<
	// 	TI,
	// 	DocConstructor.MapPartialOptions<TI, { public: S }>
	// >

	// /** ⚠️ If possible, use call signature instead */
	// private<S extends Record<string, t.Schemable>>(
	// 	s: S,
	// ): DocConstructor.WithOverrides<
	// 	TI,
	// 	DocConstructor.MapPartialOptions<TI, { private: S }>
	// >

	//

	//

	/** ⚠️ If possible, use `@after` decorator instead */
	after(trigger: Trigger.After<CustomDoc<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@after` decorator instead */
	after(name: string, trigger: Trigger.After<CustomDoc<TI, 'inside'>>): this

	/**
	 * ⚠️ If possible, use `@afterUpdate` decorator instead
	 *
	 * - Assignability issues - using DocBase instead (statically known fields only)
	 */
	afterUpdate(trigger: Trigger.AfterUpdate<CustomDoc<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@afterUpdate` decorator instead */
	afterUpdate(
		name: string,
		trigger: Trigger.AfterUpdate<CustomDoc<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@afterCreateOrUpdate` decorator instead */
	afterCreateOrUpdate(
		trigger: Trigger.AfterCreateOrUpdate<CustomDoc<TI, 'inside'>>,
	): this

	/** ⚠️ If possible, use `@afterCreateOrUpdate` decorator instead */
	afterCreateOrUpdate(
		name: string,
		trigger: Trigger.AfterCreateOrUpdate<CustomDoc<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@afterCreate` decorator instead */
	afterCreate(trigger: Trigger.AfterCreate<CustomDoc<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@afterCreate` decorator instead */
	afterCreate(
		name: string,
		trigger: Trigger.AfterCreate<CustomDoc<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@afterDelete` decorator instead */
	afterDelete(trigger: Trigger.AfterDelete<CustomDoc<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@afterDelete` decorator instead */
	afterDelete(
		name: string,
		trigger: Trigger.AfterDelete<CustomDoc<TI, 'inside'>>,
	): this

	//

	/** ⚠️ If possible, use `@beforeCommit` decorator instead */
	beforeCommit(trigger: Trigger.BeforeCommit<CustomDoc<TI, 'inside'>>): this

	/** ⚠️ If possible, use `@beforeCommit` decorator instead */
	beforeCommit(
		name: string,
		trigger: Trigger.BeforeCommit<CustomDoc<TI, 'inside'>>,
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
		Target extends DocTag,
		Name extends string & keyof Get_<Get_<Target, DTI>, 'aggregates'>,
	>(
		/** Unused - type inference only */
		_target: Target,
		name: Name,
		handlers: AggregatorHandlers<GetDocTag<TI>, Target, Name>,
	): this

	get schemaWithoutId(): s.SchemarAnd<
		TI['publicOnCreation'],
		s.SchemarAnd<TI['public'], TI['private']>
	>

	get schemaWithId(): s.SchemarAnd.GetObject<
		s.GetObject$<{
			id: TI['id'] extends s.$$Schema ? TI['id'] : s.String
		}>,
		s.SchemarAnd.GetObject<
			TI['publicOnCreation'],
			s.SchemarAnd<TI['public'], TI['private']>
		>
	>

	get idSchema(): TI['id'] extends s.SchemaLike<string>
		? TI['id']
		: AutoIdSchema<this['_']['tag']>
}

//

// $dev(<TI extends $$DocTI>() => {
// 	$Assert.is<DocConstructor<TI>, DocConstructor>()
// })

//

//

/** Helpers */
export namespace DocConstructor {
	export type WithTag<
		TI extends DocTI,
		tag extends DocTag | AnyDoc,
	> = WithOverrides<TI, { tag: tag }>

	export type WithOverrides<Old extends DocTI, New extends Partial<DocTI>> = [
		DocConstructor<Override<Old, New>>,
	][0]

	export type MapPartialOptions<
		TI extends $$DocTI,
		O extends $$PartialDocOptions,
	> = TI extends {
		publicOnCreation: s.$$Object
		public: s.$$Object
		private: s.$$Object
		aggregates: {}
	}
		? OmitByValue<
				{
					tag: 'tag' extends keyof O ? O['tag'] : never
					id: 'id' extends keyof O ? O['id'] : never

					publicOnCreation: 'publicOnCreation' extends keyof O
						? s.SchemarAnd<
								TI['publicOnCreation'],
								InferSchema$<O['publicOnCreation']>
						  >
						: never

					public: 'public' extends keyof O
						? s.SchemarAnd<TI['public'], InferSchema$<O['public']>>
						: never

					private: 'private' extends keyof O
						? s.SchemarAnd<TI['private'], InferSchema$<O['private']>>
						: never

					aggregates: 'aggregates' extends keyof O
						? Override<TI['aggregates'], O['aggregates']>
						: never
				},
				undefined
		  >
		: never

	/**
	 * Generally forward this task to `@voltiso/schemar`, but treat `{}` as object
	 * schemas
	 */
	export type InferSchema$<S extends s.$$Schemable> = IsIdentical<
		S,
		{}
	> extends true
		? s.Object$<{}>
		: s.ImplicitInferSchema$<S>
}
