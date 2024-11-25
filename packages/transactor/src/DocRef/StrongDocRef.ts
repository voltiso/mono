// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_CustomDocRef,
	$$DocRelated,
	$$DocRelatedLike,
	AnyDoc,
	CustomDocRef,
} from '~'

/** Strong document reference - with ref-counting ✅ */
export interface DocRef<doc extends $$DocRelated = AnyDoc>
	extends CustomDocRef<{
		doc: doc
		isStrong: true
	}> {
	// get Final(): this
}

export type DocRef_<R> = R extends $$DocRelatedLike
	? CustomDocRef<{
			doc: R
			isStrong: true
		}>
	: never

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
	return typeof x === 'object' && (x as _CustomDocRef | null)?.isStrong === true
}
