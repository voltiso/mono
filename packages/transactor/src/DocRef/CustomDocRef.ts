// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { DocBrand } from '~/brand'
import type {
	$$DocRelated,
	GAggregatePromises,
	GetDoc,
	GetDocFields,
	GetDocTag,
	GetMethodPromises,
	GetVoltisoEntry,
} from '~/Doc'
import type { DocFieldPath } from '~/DocFieldPath'

import type { DocRefContext } from './_/Context'
import { _CustomDocRef } from './_CustomDocRef'
import type { $$DocRef } from './$$DocRef'
import type { DocRef } from './DocRef'

//

export type CustomDocRef<O extends Partial<DocRef.Options> = {}> =
	CustomDocRef.Get<O>

	// eslint-disable-next-line import/export
	export const CustomDocRef = lazyValue(
	// eslint-disable-next-line etc/no-internal
	() => _CustomDocRef,
) as unknown as CustomDocRef.Constructor

// eslint-disable-next-line import/export
export namespace CustomDocRef {
	export type Get<O extends Partial<DocRef.Options>> = Base<O> &
		Extra<DocRef.Options.Get<O>['doc']>

	export interface Base<O extends Partial<DocRef.Options>>
		extends $$DocRef,
			// eslint-disable-next-line etc/no-internal
			_CustomDocRef<DocRef.Options.Get<O>>,
			IntrinsicFields<O>,
			PromiseLike<GetDoc<DocRef.Options.Get<O>['doc']> | DocRef.MaybeNull<O>>,
			DocBrand<GetDocTag<DocRef.Options.Get<O>['doc']>> {}

	export interface IntrinsicFields<O extends Partial<DocRef.Options>> {
		__voltiso: DocFieldPath<GetVoltisoEntry<DocRef.Options.Get<O>['doc']>>
	}

	/** The non-statically-known members */
	export type Extra<R extends $$DocRelated> = Omit<
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
