// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '@voltiso/util'
import { define } from '@voltiso/util'

import type { AnyDoc, DocTagLike } from '~/DocTypes'

import { CustomDocRef } from './CustomDocRef'

export interface DocRef extends CustomDocRef {}

// eslint-disable-next-line import/export
export const DocRef = CustomDocRef

//

//

// eslint-disable-next-line import/export
export namespace DocRef {
	export type MaybeNull<O extends Partial<Options>> =
		Options.Get<O>['isStrong'] extends true ? never : null

	export interface Options {
		isStrong: boolean

		/**
		 * 🌿 Type-only (no value at runtime)
		 *
		 * (Didn't work with full $$DocRelated - recursive types)
		 */
		doc: DocTagLike | AnyDoc
		// doc: $$DocRelatedLike

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

export const defaultDocRefOptions = define<DocRef.Options>().value({
	isStrong: false as boolean,

	/** 🌿 Type-only (no value at runtime) */
	doc: undefined as unknown as AnyDoc,

	// /**
	//  * Useful to make recursive types possible
	//  *
	//  * 🌿 Type-only (no value at runtime)
	//  */
	// onlyStaticallyKnownFields: undefined as unknown as false,
})
