// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { callableObject } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '../Doc'
import type { DocTag, DocTypes } from '../DocTypes'
import { DocRef } from '../Ref/DocRef'
import type { Ref, WeakRef } from '../Ref/RefBase'
import { WeakDocRef } from '../Ref/WeakDocRef'

type GD<X extends IDoc | DocTag> = X extends IDoc
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: never

interface SRef extends s.Schema<Ref<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): s.Schema<Ref<GD<X>>>
}
export type { SRef as Ref }
export const ref = callableObject(s.instance(DocRef), <
	// eslint-disable-next-line etc/no-misused-generics
	X extends IDoc | DocTag,
>(): s.Schema<Ref<GD<X>>> => {
	return s.instance(DocRef) as never
}) as unknown as SRef

//

interface SWeakRef extends s.Schema<WeakRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): s.Schema<WeakRef<GD<X>>>
}
export type { SWeakRef as WeakRef }
export const weakRef = callableObject(s.instance(WeakDocRef), <
	// eslint-disable-next-line etc/no-misused-generics
	X extends IDoc | DocTag,
>(): s.Schema<WeakRef<GD<X>>> => {
	return s.instance(WeakDocRef) as never
}) as unknown as SWeakRef
