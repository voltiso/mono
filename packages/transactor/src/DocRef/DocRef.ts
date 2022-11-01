// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '@voltiso/util'
import { define } from '@voltiso/util'

import type { AnyDocTag } from '~/DocTypes'

import type { $$DocRelated } from '..'
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
		doc: $$DocRelated
		isStrong: boolean
	}

	export namespace Options {
		export type Default = typeof defaultDocRefOptions
		export type Get<O extends Partial<Options>> = Override<Default, O>
	}
}

export const defaultDocRefOptions = define<DocRef.Options>().value({
	doc: undefined as unknown as AnyDocTag,
	isStrong: false as boolean,
})
