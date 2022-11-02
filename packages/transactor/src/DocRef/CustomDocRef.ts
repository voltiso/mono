// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '@voltiso/util'
import { define, lazyConstructor } from '@voltiso/util'

import type {
	GetAggregatePromises,
	GetDocFields,
	GetMethodPromises,
	GetVoltisoEntry,
} from '~/Doc'
import type { DocFieldPath } from '~/DocFieldPath'
import type { $$DocRelatedLike } from '~/DocRelated'

import type { AnyDoc, DocRef } from '..'
import type { DocRefContext } from './_/Context'
import { _CustomDocRef } from './_CustomDocRef'

//

// eslint-disable-next-line import/export
export const CustomDocRef = lazyConstructor(
	// eslint-disable-next-line etc/no-internal
	() => _CustomDocRef,
) as unknown as CustomDocRef.Constructor

export interface CustomDocRef<O extends Partial<CustomDocRef.Options> = {}>
	extends CustomDocRef.Get<O> {}

// eslint-disable-next-line import/export
export namespace CustomDocRef {
	export type Get<O extends Partial<Options>> = Base<O>
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

	/** 🟢 The statically-known members */
	export interface Base<O extends Partial<DocRef.Options>>
		// eslint-disable-next-line etc/no-internal
		extends _CustomDocRef<Options.Get<O>> {}

	export interface IntrinsicFields<O extends Partial<DocRef.Options>> {
		__voltiso: DocFieldPath<GetVoltisoEntry<Options.Get<O>['doc']>>
	}

	/**
	 * 👻 The non-statically-known members
	 *
	 * ⚠️ Troublesome - currently disabled
	 */
	export type Extra<R extends $$DocRelatedLike> = Omit<
		GetDocFields<R> & GetMethodPromises<R> & GetAggregatePromises<R>,
		keyof Base<any>
	>

	export interface Constructor {
		new <O extends Partial<Options>>(
			context: DocRefContext.Parent,
			path: string,
			partialOptions: Partial<O>,
		): CustomDocRef<O>
	}

	//

	//

	export type MaybeNull<O extends Partial<Options>> =
		Options.Get<O>['isStrong'] extends true ? never : null

	export interface Options {
		isStrong: boolean

		/**
		 * 🌿 Type-only (no value at runtime)
		 *
		 * (Didn't work with full $$DocRelated - recursive types)
		 */
		doc: $$DocRelatedLike
		// doc: DocTagLike | AnyDoc

		// /**
		//  * Useful to make recursive types possible
		//  *
		//  * 🌿 Type-only (no value at runtime)
		//  */
		// onlyStaticallyKnownFields: boolean
	}

	export namespace Options {
		export type Default = typeof defaultDocRefOptions
		export type Get<O extends Partial<Options>> = Override<Default, O>
	}
}

export const defaultDocRefOptions = define<CustomDocRef.Options>().value({
	isStrong: false as boolean, // must be supertype

	/** 🌿 Type-only (no value at runtime) */
	doc: undefined as unknown as AnyDoc,

	// /**
	//  * Useful to make recursive types possible
	//  *
	//  * 🌿 Type-only (no value at runtime)
	//  */
	// onlyStaticallyKnownFields: undefined as unknown as false,
})
