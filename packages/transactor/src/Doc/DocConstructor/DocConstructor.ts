// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import type {
	_,
	$_,
	Merge2,
	Merge2Reverse_,
	OmitSignatures,
	Throw,
} from '@voltiso/util'

import type { AggregatorHandlers } from '~/Aggregator'
import type {
	Doc,
	DocBuilderPluginLike,
	DocConstructorLike,
	DocContext,
	DocTI,
	DTI,
	Promisify,
} from '~/Doc'
import type { GetInputData } from '~/Doc/_/GData'
import type { GI, GO } from '~/Doc/_/GDoc'
import type { NewFields } from '~/Doc/_/NewFields'
import type { DocBuilderPluginResult } from '~/DocBuilderPluginResult-module-augmentation'
import type { DocTag } from '~/DocTypes'
import type { Method } from '~/Method'
import type { AfterTrigger, BeforeCommitTrigger } from '~/Trigger'

import type { DocDerivedData } from './_/DocDerivedData'
import type { $MergeTI } from './_/MergeTI'

type MaybeWithName<Params> = [Params] | [string, Params]

type ___<X extends DocTI> = X extends any ? DocConstructor<$MergeTI<X>> : never

export type MapNewField<
	F extends Record<string, t.Schemable> | t.ObjectLike | undefined,
> = F extends t.ObjectLike ? F['getShape'] : F extends undefined ? unknown : F

export type MapNewFields<F extends NewFields> = Merge2Reverse_<
	{
		publicOnCreation: MapNewField<F['publicOnCreation']>
		public: MapNewField<F['public']>
		private: MapNewField<F['private']>
	},
	F
>

export interface DocConstructor<TI extends DocTI = DocTI> {
	readonly [DTI]: TI
	readonly _: DocDerivedData

	new (context: DocContext, data: GetInputData<TI>): Doc<TI, 'outside'>

	// <Derived>(): DocConstructor<___<Merge2<TI, { doc: Derived & DocU }>>>
	<Tag extends DocTag>(tag: Tag): ___<Merge2<TI, { tag: Tag }>>

	<F extends NewFields>(f: F): keyof F extends keyof NewFields
		? ___<TI & MapNewFields<F>>
		: Throw<'unknown keys:' & { keys: Exclude<keyof F, keyof NewFields> }>

	tag<Tag extends DocTag>(tag: Tag): ___<Merge2<TI, { tag: Tag }>>

	fields<F extends NewFields>(
		f: F,
	): keyof F extends keyof NewFields
		? ___<TI & MapNewFields<F>>
		: Throw<'unknown keys:' & { keys: Exclude<keyof F, keyof NewFields> }>

	publicOnCreation<S extends Record<string, t.Schemable>>(
		s: S,
	): ___<TI & { publicOnCreation: S extends t.ObjectLike ? S['getShape'] : S }>

	public<S extends Record<string, t.Schemable> | t.ObjectLike>(
		s: S,
	): ___<TI & { public: S extends t.ObjectLike ? S['getShape'] : S }>

	private<S extends Record<string, t.Schemable>>(
		s: S,
	): ___<TI & { private: S extends t.ObjectLike ? S['getShape'] : S }>

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
		Target extends DocConstructorLike,
		Name extends keyof Target[DTI]['aggregates'],
	>(
		target: Target,
		name: Name,
		handlers: AggregatorHandlers<TI, InstanceType<Target>, Name>,
	): DocConstructor<TI>

	get schemaWithoutId(): t.Object<
		TI['publicOnCreation'] & TI['public'] & TI['private'] // & {}
	>

	get schemaWithId(): t.Object<
		$_<
			{
				id: TI['id'] extends t.SchemaLike<string> ? TI['id'] : t.String
			} & TI['publicOnCreation'] &
				TI['public'] &
				TI['private']
		>
	>

	get idSchema(): unknown extends TI['id'] ? t.String : TI['id']
}
