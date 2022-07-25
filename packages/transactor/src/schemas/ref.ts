// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { callableObject, lazyValue, undef } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '../Doc'
import type { DocTag, DocTypes } from '../DocTypes.js'
import type { DocRefBase_ } from '../Ref'
import { StrongDocRef, WeakDocRef } from '../Ref'
import type { StrongRef, WeakRef } from '../Ref/RefBase.js'

type GD<X extends IDoc | DocTag> = X extends IDoc
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: never

const strongRefSchema = lazyValue(() => s.instance(StrongDocRef))

interface SStrongRef extends s.Schema<StrongRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): s.Schema<StrongRef<GD<X>>>
}
export type { SStrongRef as StrongRef }
export const strongRef = lazyValue(
	() =>
		callableObject(strongRefSchema, <
			// eslint-disable-next-line etc/no-misused-generics
			X extends IDoc | DocTag,
		>(): s.Schema<StrongRef<GD<X>>> => {
			return strongRefSchema as never
		}) as unknown as SStrongRef,
)
//

const weakRefSchema = lazyValue(() => s.instance(WeakDocRef))

const fixableWeakRefSchema = lazyValue(() =>
	weakRefSchema.or(strongRefSchema).withFix(x => {
		if (strongRefSchema.isValid(x))
			return new WeakDocRef(
				(x as DocRefBase_)._context as never,
				x.path.pathString,
			)
		else return undef
	}),
)

interface SWeakRef extends s.Schema<WeakRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): s.Schema<WeakRef<GD<X>>>
}
export type { SWeakRef as WeakRef }
export const weakRef = lazyValue(
	() =>
		callableObject(fixableWeakRefSchema, <
			// eslint-disable-next-line etc/no-misused-generics
			X extends IDoc | DocTag,
		>(): s.Schema<WeakRef<GD<X>>> => {
			return fixableWeakRefSchema as never
		}) as unknown as SWeakRef,
)
