// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { lazyValue, OPTIONS, ProtoCallable } from '@voltiso/util'

import type {
	DocRefLike,
	GetDocRef,
	WeakDocRef,
	WeakDocRefLike,
} from '~/DocRef'
import { DocRef } from '~/DocRef'
import type { DocTag } from '~/DocTypes'

/**
 * Match any ref, make it weakRef
 *
 * @internal
 */
const _fixableWeakRefSchema = lazyValue(
	() =>
		s.instance(DocRef).fix(x => {
			if (x.isStrong === false) return x // already weak

			return new DocRef(x._context as never, x.path.toString(), {
				// eslint-disable-next-line security/detect-object-injection
				...x[OPTIONS],
				isStrong: false,
			}) as unknown as WeakDocRef
		}) as unknown as t.CustomSchema<{
			Input: DocRef
			Output: GetDocRef<{ isStrong: false }>
		}>,
)

/** 🫠 Accept any, output weak */
export interface FixableWeakRefSchema<
	X extends DocTag | AnyDoc = AnyDoc,
> extends t.CustomSchema<{
		Input: GetDocRef<{ doc: X }>
		Output: GetDocRef<{
			doc: X
			isStrong: false
		}>
	}> {}

/**
 * 🚴‍♂️ Cycle-safe
 *
 * 🫠 Accept any, output weak
 */
export interface FixableWeakRefSchemaRec<
	X extends DocTag | AnyDoc = AnyDoc,
> extends t.CustomSchema<{
		Input: DocRefLike<X>
		Output: WeakDocRefLike<X>
	}> {}

export interface WeakRefSchema extends FixableWeakRefSchema {
	<X extends DocTag>(): FixableWeakRefSchemaRec<X>
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
