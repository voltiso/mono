// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	GAggregatePromises,
	GetDocFields,
	GetMethodPromises,
	GetVoltisoEntry,
} from '~/Doc'
import type { DocFieldPath } from '~/DocFieldPath'
import type { $$DocRelatedLike, GetDoc } from '~/DocRelated'

import type { DocRefContext } from './_/Context'
import { _CustomDocRef } from './_CustomDocRef'
import type { $$DocRef } from './$$DocRef'
import type { DocRef } from './DocRef'

//

export type CustomDocRef<O extends Partial<DocRef.Options> = {}> =
	CustomDocRef.Get<O>

// eslint-disable-next-line import/export
export const CustomDocRef = lazyConstructor(
	// eslint-disable-next-line etc/no-internal
	() => _CustomDocRef,
) as unknown as CustomDocRef.Constructor

// eslint-disable-next-line import/export
export namespace CustomDocRef {
	export type Get<O extends Partial<DocRef.Options>> = Base<O> &
		Extra<DocRef.Options.Get<O>['doc']>

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
		extends $$DocRef,
			// eslint-disable-next-line etc/no-internal
			_CustomDocRef<DocRef.Options.Get<O>>,
			IntrinsicFields<O>,
			PromiseLike<
				GetDoc.ByTag<DocRef.Options.Get<O>['doc']> | DocRef.MaybeNull<O>
			> {}

	export interface IntrinsicFields<O extends Partial<DocRef.Options>> {
		__voltiso: DocFieldPath<GetVoltisoEntry<DocRef.Options.Get<O>['doc']>>
	}

	/** 👻 The non-statically-known members */
	export type Extra<R extends $$DocRelatedLike> = Omit<
		GetDocFields<R> & GetMethodPromises<R> & GAggregatePromises<R>,
		keyof Base<any>
	>

	export interface Constructor {
		new <O extends Partial<DocRef.Options>>(
			context: DocRefContext.Parent,
			path: string,
			partialOptions: Partial<O>,
		): CustomDocRef<O>
	}
}
