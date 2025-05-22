// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Output_, Schema } from '@voltiso/schemar'
import type { _, $Override_, DeleteIt, If, PatchFor } from '@voltiso/util'
import { $Assert, lazyConstructor } from '@voltiso/util'

import type {
	$$DocRef,
	$WithId,
	ANY_DOC,
	DocBrand,
	DocIdString,
	DocPath,
	DocRefDatabase,
	DocRefJson,
	GetAggregatePromises,
	GetData,
	GetDataWithId,
	GetDoc,
	GetDocRef,
	GetDocTag,
	GetDocTI,
	GetMethodPromises,
	GetPublicCreationInputData,
	GetUpdateDataByCtx,
	NestedPromise,
} from '~'
import type { GetVoltisoEntry } from '~/Doc'
import type { DocFieldPath } from '~/DocFieldPath'
import type { $$DocRelatedLike } from '~/DocRelated'

import type { DocRefContext } from './_/Context'
import { _CustomDocRef } from './_CustomDocRef'

//

// eslint-disable-next-line import/export
export const CustomDocRef = lazyConstructor(
	() => _CustomDocRef,
) as unknown as CustomDocRef.Constructor

export interface CustomDocRefBase<O extends Partial<CustomDocRef.Options>>
	extends $$DocRef,
		DocBrand<GetDocTag<CustomDocRef.Options.Get<O>['doc']>>,
		CustomDocRef.IntrinsicFields<O> {
	readonly [Voltiso.OPTIONS]: CustomDocRef.Options.Get<O>

	//

	get isStrong(): O['isStrong']

	get id(): DocIdString<GetDocTI<this[Voltiso.OPTIONS]['doc']>> &
		Output_<GetDocTI<this[Voltiso.OPTIONS]['doc']>['id']>

	get path(): DocPath<this[Voltiso.OPTIONS]['doc']>

	//

	/** @returns `PromiseLike`! (`then`-only) */
	delete(): PromiseLike<null>

	//

	//

	get data(): NestedPromise<
		GetData<this[Voltiso.OPTIONS]['doc']>,
		O['isStrong'] extends true ? true : boolean
	>

	dataWithId(): NestedPromise<
		GetDataWithId<this[Voltiso.OPTIONS]['doc']>,
		O['isStrong'] extends true ? true : boolean
	>

	readonly aggregates: GetAggregatePromises<this[Voltiso.OPTIONS]['doc']>

	readonly methods: GetMethodPromises<this[Voltiso.OPTIONS]['doc']>

	//

	get schema(): Schema<GetData<this[Voltiso.OPTIONS]['doc']>> | undefined
	get schemaWithId():
		| Schema<$WithId<GetData<this[Voltiso.OPTIONS]['doc']>>>
		| undefined
	get aggregateSchemas(): GetDocTI<this[Voltiso.OPTIONS]['doc']>['aggregates']

	//

	toDatabase(): DocRefDatabase
	toJSON(): DocRefJson
}

// export type CustomDocRef_<O> = O extends Partial<CustomDocRef.Options>
// 	? CustomDocRef<O>
// 	: never

export interface CustomDocRef<O extends Partial<CustomDocRef.Options> = {}>
	extends CustomDocRefBase<O>,
		PromiseLike<
			| GetDoc<CustomDocRef.Options.Get<O>['doc']>
			| CustomDocRef.MaybeNull<CustomDocRef.Options.Get<O>>
		> {
	/** @returns `PromiseLike`! (`then`-only) */
	get(): PromiseLike<
		GetDoc<this[Voltiso.OPTIONS]['doc']> | If<O['isStrong'], never, null>
	>

	//

	/** @returns `PromiseLike`! (`then`-only) */
	update(
		updates: PatchFor<
			GetUpdateDataByCtx<this[Voltiso.OPTIONS]['doc'], 'outside'>
		>,
	): PromiseLike<GetDoc<this[Voltiso.OPTIONS]['doc']>>

	/** @returns `PromiseLike`! (`then`-only) */
	update(updates: DeleteIt): PromiseLike<null>

	/** @returns `PromiseLike`! (`then`-only) */
	update(
		updates:
			| PatchFor<GetUpdateDataByCtx<this[Voltiso.OPTIONS]['doc'], 'outside'>>
			| DeleteIt,
	): PromiseLike<GetDoc<this[Voltiso.OPTIONS]['doc']> | null>

	//

	/** @returns `PromiseLike`! (`then`-only) */
	set(
		data?: GetPublicCreationInputData<this[Voltiso.OPTIONS]['doc']>,
	): PromiseLike<GetDoc<this[Voltiso.OPTIONS]['doc']>>

	create(
		data?: _<GetPublicCreationInputData<this[Voltiso.OPTIONS]['doc']>>,
	): PromiseLike<GetDoc<this[Voltiso.OPTIONS]['doc']>>

	//

	get asStrongRef(): GetDocRef<$Override_<O, { isStrong: true }>>
	get asWeakRef(): GetDocRef<$Override_<O, { isStrong: false }>>

	// /** Remove the builder typings - for vscode performance */
	// get Final(): this
}

// eslint-disable-next-line import/export
export namespace CustomDocRef {
	// export type Get<O extends Partial<Options>> = Base<O>
	// & Extra<Options.Get<O>['doc']> // ! disable this stuff...

	// export type Get<O extends Partial<DocRef.Options>> = Base<
	// 	$_<$Omit<O, 'onlyStaticallyKnownFields'>>
	// > &
	// 	(DocRef.Options.Get<O>['onlyStaticallyKnownFields'] extends true
	// 		? unknown
	// 		: Extra<DocRef.Options.Get<O>['doc']>)

	// export interface RecursionSafe<O extends Partial<DocRef.Options>>
	// 	extends $$DocRef,
	// 		IntrinsicFields<O>,
	// 		DocBrand<GetDocTag<DocRef.Options.Get<O>['doc']>> {}

	// /** 🟢 The statically-known members */
	// export interface Base<O extends Partial<DocRef.Options>>
	// 	// eslint-disable-next-line etc/no-internal
	// 	extends _CustomDocRef<Options.Get<O>> {}

	export interface IntrinsicFields<O extends Partial<Options>> {
		__voltiso: DocFieldPath<GetVoltisoEntry<Options.Get<O>['doc']>>
	}

	// /**
	//  * 👻 The non-statically-known members
	//  *
	//  * ⚠️ Troublesome - currently disabled
	//  */
	// export type Extra<R extends $$DocRelatedLike> = Omit<
	// 	GetDocFields<R> & GetMethodPromises<R> & GetAggregatePromises<R>,
	// 	keyof Base<any>
	// >

	export interface Constructor {
		new <O extends Partial<Options>>(
			context: DocRefContext.Parent,
			path: string,
			partialOptions?: Partial<O>,
		): GetDocRef<O>
	}

	//

	//

	export type MaybeNull<O extends Options> = O['isStrong'] extends true
		? never
		: null

	export interface Options {
		isStrong: boolean

		/**
		 * 🌿 Type-only (no value at runtime)
		 *
		 * (Didn't work with full $$DocRelated - recursive types)
		 */
		doc: $$DocRelatedLike
		// doc: DocTagLike | ANY_DOC

		// /**
		//  * Useful to make recursive types possible
		//  *
		//  * 🌿 Type-only (no value at runtime)
		//  */
		// onlyStaticallyKnownFields: boolean
	}

	export namespace Options {
		export type Default = typeof defaultDocRefOptions

		/**
		 * Get full options
		 *
		 * - Use doc tag if possible
		 */
		export type Get<O extends Partial<Options>> = $Override_<Default, O>
		//  O extends {
		// 	readonly doc: $$Doc
		// }
		// 	? $Override_<Default, $Override_<O, { doc: GetDocTag.Simple<O['doc']> }>>
		// 	: $Override_<Default, O>
	}
}

export const defaultDocRefOptions = {
	isStrong: false as boolean, // must be supertype

	/** 🌿 Type-only (no value at runtime) */
	doc: undefined as unknown as ANY_DOC,
}

//

$Assert.is<typeof defaultDocRefOptions, CustomDocRef.Options.Default>()
