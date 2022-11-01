// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomDocRef } from './CustomDocRef'
import type { DocRef } from './DocRef'

export type CustomStrongDocRef<O extends Partial<StrongDocRef.Options>> =
	CustomDocRef<O & { isStrong: true }>

export type StrongDocRef = CustomStrongDocRef<{}>

export namespace StrongDocRef {
	export type Options = Omit<DocRef.Options, 'isStrong'>
}

//

export function isStrongDocRef(x: unknown): x is StrongDocRef {
	return typeof x === 'object' && (x as DocRef | null)?.isStrong === true
}
