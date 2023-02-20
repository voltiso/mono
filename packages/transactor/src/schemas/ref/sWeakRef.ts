// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable etc/no-internal */

import * as s from '@voltiso/schemar'
import { lazyFunction, lazyObject, OPTIONS, ProtoCallable } from '@voltiso/util'

import type { $$DocRelated, WeakDocRef } from '~'
import { _CustomDocRef } from '~'
import type { AnyDoc, DocTag } from '~/DocTypes'

/**
 * Match any ref, make it weakRef
 *
 * @internal
 */
const _fixableWeakRefSchema = lazyObject(() =>
	s.instance(_CustomDocRef).narrowIf(
		x => x.isStrong,
		x =>
			new _CustomDocRef(x._context as never, x.path.toString(), {
				...x[OPTIONS],
				isStrong: false,
			}) as never,
	),
)

//

/** 🫠 Accept any, output weak - but currently weak is just supertype */
export interface FixableWeakDocRefSchema<X extends $$DocRelated = AnyDoc>
	extends s.Schema<WeakDocRef<X>> {}

/** 🫠 Accept any, output weak - but currently weak is just supertype */
export interface FixableWeakDocRefSchema$<X extends $$DocRelated = AnyDoc>
	extends s.Schema$<WeakDocRef<X>> {
	//
	get Final(): FixableWeakDocRefSchema<X>
}

//

export interface UnknownFixableWeakDocRefSchema
	extends FixableWeakDocRefSchema {}

export interface UnknownFixableWeakDocRefSchema$
	extends FixableWeakDocRefSchema$ {
	<X extends DocTag>(): FixableWeakDocRefSchema$<X>

	get Final(): UnknownFixableWeakDocRefSchema
}

//

export const sWeakRef: UnknownFixableWeakDocRefSchema$ = lazyFunction(() =>
	ProtoCallable({
		prototype: _fixableWeakRefSchema,

		call: () => _fixableWeakRefSchema,
	}),
) as never
