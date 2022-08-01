// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { callableObject, lazyValue, undef } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '~/Doc'
import type { DocTag, DocTypes } from '~/DocTypes'
import type { DocRefBaseImpl } from '~/Ref'
import { StrongDocRef, WeakDocRef } from '~/Ref'
import type { StrongRef, WeakRef } from '~/Ref/RefBase'

type FindDoc<X> = X extends IDoc
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: never

const _strongRefSchema: s.Instance<StrongDocRef<IDoc>> = lazyValue(() =>
	s.instance(StrongDocRef),
)

const _strongRefCall = <
	// eslint-disable-next-line etc/no-misused-generics
	X,
>(): s.Schema<StrongRef<FindDoc<X>>> => {
	return _strongRefSchema as never
}

export interface StrongRefSchema extends s.Schema<StrongRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): s.Schema<StrongRef<FindDoc<X>>>
}

export const strongRef: StrongRefSchema = callableObject(
	_strongRefSchema,
	_strongRefCall,
) as never
//

export const ref = strongRef

const _weakRefSchema = lazyValue(() => s.instance(WeakDocRef))

const fixableWeakRefSchema = lazyValue(() =>
	_weakRefSchema.or(_strongRefSchema).withFix(x => {
		if (_strongRefSchema.isValid(x))
			return new WeakDocRef(
				(x as DocRefBaseImpl)._context as never,
				x.path.pathString,
			)
		else return undef
	}),
)

export interface WeakRefSchema extends s.Schema<WeakRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): s.Schema<WeakRef<FindDoc<X>>>
}
export const weakRef = lazyValue(
	() =>
		callableObject(fixableWeakRefSchema, <
			// eslint-disable-next-line etc/no-misused-generics
			X extends IDoc | DocTag,
		>(): s.Schema<WeakRef<FindDoc<X>>> => {
			return fixableWeakRefSchema as never
		}) as unknown as WeakRefSchema,
)
