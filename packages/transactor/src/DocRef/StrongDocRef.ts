// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _CustomDocRef, $$DocRelatedLike, AnyDoc, CustomDocRef } from '~'

/** Strong document reference - with ref-counting ✅ */
export interface DocRef<doc extends $$DocRelatedLike = AnyDoc>
	extends CustomDocRef<{
		doc: doc
		isStrong: true
	}> {
	// get Final(): this
}

// /** Strong document reference - with ref-counting ✅ */
// export interface DocRef$<doc extends $$DocRelatedLike = AnyDoc>
// 	extends CustomDocRef$<{
// 		doc: doc
// 		isStrong: true
// 	}> {
// 	get Final(): DocRef<doc>
// }

export namespace DocRef {
	export type Options = Omit<CustomDocRef.Options, 'isStrong'>
}

//

export function isStrongDocRef(x: unknown): x is DocRef {
	// eslint-disable-next-line etc/no-internal
	return typeof x === 'object' && (x as _CustomDocRef | null)?.isStrong === true
}
