// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { ProtoCallable, lazyValue } from '@voltiso/util'

import type { $$Doc, IDoc, IndexedDoc } from '~/Doc'
import type { DocRefBaseImpl, WeakDocRefBase } from '~/DocRef'
import { WeakDocRefImpl } from '~/DocRef'
import type { DocTag } from '~/DocTypes'

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

export interface WeakRefSchema extends t.ISchema<WeakDocRefBase<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends $$Doc | DocTag>(): t.Schema<WeakDocRefBase<FindDoc<X>>>
}

export const sWeakRef = lazyValue(
	() =>
		ProtoCallable({
			// eslint-disable-next-line etc/no-internal
			prototype: _fixableWeakRefSchema,

			call: <
				// eslint-disable-next-line etc/no-misused-generics
				X extends $$Doc | DocTag,
			>(): t.Schema<WeakDocRefBase<FindDoc<X>>> =>
				// eslint-disable-next-line etc/no-internal
				_fixableWeakRefSchema as never,
		}) as unknown as WeakRefSchema,
)
