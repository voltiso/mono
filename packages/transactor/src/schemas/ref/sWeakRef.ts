// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { callableObject, lazyValue } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocRefBaseImpl } from '~/Ref'
import { WeakDocRefImpl } from '~/Ref'
import type { WeakRef } from '~/Ref/RefBase'

import type { FindDoc } from './_'
import { _strongRefSchema } from './sStrongRef'

/** @internal */
const _weakRefSchema = lazyValue(() => s.instance(WeakDocRefImpl<IDoc>))

/** @internal */
const _fixableWeakRefSchema = lazyValue(() =>
	// eslint-disable-next-line etc/no-internal
	_weakRefSchema.or(_strongRefSchema).fix(x => {
		// eslint-disable-next-line etc/no-internal
		if (_strongRefSchema.isValid(x))
			return new WeakDocRefImpl<IDoc>(
				(x as unknown as DocRefBaseImpl)._context as never,
				x.path.pathString,
			)
		else return undefined
	}),
)

export interface WeakRefSchema extends t.ISchema<WeakRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): t.Schema<WeakRef<FindDoc<X>>>
}
export const sWeakRef = lazyValue(
	() =>
		callableObject(
			// eslint-disable-next-line etc/no-internal
			_fixableWeakRefSchema,
			<
				// eslint-disable-next-line etc/no-misused-generics
				X extends IDoc | DocTag,
				// eslint-disable-next-line etc/no-internal
			>(): t.Schema<WeakRef<FindDoc<X>>> => _fixableWeakRefSchema as never,
		) as unknown as WeakRefSchema,
)
