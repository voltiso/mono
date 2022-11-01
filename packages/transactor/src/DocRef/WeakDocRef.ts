// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomDocRef } from './CustomDocRef'
import type { DocRef } from './DocRef'

export type CustomWeakDocRef<O extends Partial<WeakDocRef.Options>> =
	CustomDocRef<O & { isStrong: false }>

export type WeakDocRef = CustomWeakDocRef<{}>

export namespace WeakDocRef {
	export type Options = Omit<DocRef.Options, 'isStrong'>
}

//

export function isWeakDocRef(x: unknown): x is WeakDocRef {
	return typeof x === 'object' && (x as DocRef | null)?.isStrong === false
}
