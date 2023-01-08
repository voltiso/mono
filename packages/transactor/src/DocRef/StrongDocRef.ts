// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AnyDoc } from '~/DocTypes'

import type { $$DocRelatedLike } from '..'
import type { CustomDocRef } from './CustomDocRef'
import type { WeakDocRef } from './WeakDocRef'

/** Strong document reference - with ref-counting ✅ */
export interface DocRef<doc extends $$DocRelatedLike = AnyDoc>
	extends CustomDocRef<{
		doc: doc
		isStrong: true
	}> {}

export namespace DocRef {
	export type Options = Omit<CustomDocRef.Options, 'isStrong'>
}

//

export function isStrongDocRef(x: unknown): x is DocRef {
	return typeof x === 'object' && (x as WeakDocRef | null)?.isStrong === true
}
