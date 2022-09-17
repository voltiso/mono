// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { callableObject, lazyValue, undef } from '@voltiso/util'

import type { DocLike, IDoc, IndexedDoc } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocTypes } from '~/DocTypes-module-augmentation'
import type { DocRefBaseImpl } from '~/Ref'
import { StrongDocRef, WeakDocRef } from '~/Ref'
import type { StrongRef, WeakRef } from '~/Ref/RefBase'

type FindDoc<X> = X extends DocLike
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: never

const _strongRefSchema: t.Instance<StrongDocRef<IDoc>> = lazyValue(() =>
	s.instance(StrongDocRef<IDoc>),
)

const _strongRefCall = <
	// eslint-disable-next-line etc/no-misused-generics
	X,
>(): t.Schema<StrongRef<FindDoc<X>>> => _strongRefSchema as never

export interface StrongRefSchema extends t.Schema<StrongRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): t.Schema<StrongRef<FindDoc<X>>>
}

export const sStrongRef: StrongRefSchema = lazyValue(
	() => callableObject(_strongRefSchema, _strongRefCall) as never,
)
//

export const sRef = sStrongRef

const _weakRefSchema = lazyValue(() => s.instance(WeakDocRef))

const _fixableWeakRefSchema = lazyValue(() =>
	_weakRefSchema.or(_strongRefSchema).fix(x => {
		if (_strongRefSchema.isValid(x))
			return new WeakDocRef(
				(x as unknown as DocRefBaseImpl)._context as never,
				x.path.pathString,
			)
		else return undef
	}),
)

export interface WeakRefSchema extends t.ISchema<WeakRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): t.Schema<WeakRef<FindDoc<X>>>
}
export const sWeakRef = lazyValue(
	() =>
		callableObject(
			_fixableWeakRefSchema,
			<
				// eslint-disable-next-line etc/no-misused-generics
				X extends IDoc | DocTag,
			>(): t.Schema<WeakRef<FindDoc<X>>> => _fixableWeakRefSchema as never,
		) as unknown as WeakRefSchema,
)
