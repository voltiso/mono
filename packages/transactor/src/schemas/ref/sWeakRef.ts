// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { lazyValue, OPTIONS, ProtoCallable } from '@voltiso/util'

import type { WeakDocRefLike, WeakDocRef } from '~/DocRef'
import { CustomDocRef } from '~/DocRef'
import type { AnyDoc, DocTag } from '~/DocTypes'

/**
 * Match any ref, make it weakRef
 *
 * @internal
 */
const _fixableWeakRefSchema = lazyValue(
	() =>
		s.instance(CustomDocRef).fix(x => {
			if (x.isStrong === false) return x // already weak

			return new CustomDocRef(x._context as never, x.path.toString(), {
				// eslint-disable-next-line security/detect-object-injection
				...x[OPTIONS],
				isStrong: false,
			}) as unknown as WeakDocRef
		}) as unknown as t.Schema<WeakDocRef>,
)

/** 🫠 Accept any, output weak - but currently weak is just supertype */
export interface FixableWeakRefSchema<X extends DocTag | AnyDoc = AnyDoc>
	extends t.Schema<WeakDocRefLike<X>> {}

export interface WeakRefSchema extends FixableWeakRefSchema {
	<X extends DocTag>(): FixableWeakRefSchema<X>
}

export const sWeakRef: WeakRefSchema = lazyValue(() =>
	ProtoCallable({
		// eslint-disable-next-line etc/no-internal
		prototype: _fixableWeakRefSchema,

		call: () =>
			// eslint-disable-next-line etc/no-internal
			_fixableWeakRefSchema,
	}),
) as never
