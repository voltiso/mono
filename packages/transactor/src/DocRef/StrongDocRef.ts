// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AnyDoc, DocTagLike } from '~/DocTypes'

import type { CustomDocRef } from './CustomDocRef'
import type { DocRef } from './DocRef'

export type StrongDocRef<doc extends DocTagLike | AnyDoc = AnyDoc> =
	CustomDocRef<{
		doc: doc
		isStrong: true
	}>

export namespace StrongDocRef {
	export type Options = Omit<DocRef.Options, 'isStrong'>
}

//

export function isStrongDocRef(x: unknown): x is StrongDocRef {
	return typeof x === 'object' && (x as DocRef | null)?.isStrong === true
}
