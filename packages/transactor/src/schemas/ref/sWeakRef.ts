// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { lazyValue, OPTIONS, ProtoCallable } from '@voltiso/util'

import type { $$DocRelated, GetDocTag } from '~/Doc'
import type { CustomDocRef } from '~/DocRef'
import { DocRef } from '~/DocRef'

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
			})
		}) as unknown as t.CustomSchema<{
			Input: DocRef
			Output: CustomDocRef<{ isStrong: false }>
		}>,
)

// eslint-disable-next-line etc/no-internal
export type FixableWeakRefSchema = typeof _fixableWeakRefSchema

export interface WeakRefSchema extends FixableWeakRefSchema {
	<X extends $$DocRelated>(): t.CustomSchema<{
		Input: CustomDocRef<{ doc: GetDocTag<X> }>
		Output: CustomDocRef<{ doc: GetDocTag<X>; isStrong: false }>
	}>
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
