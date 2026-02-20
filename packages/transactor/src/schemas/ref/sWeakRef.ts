// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { lazyFunction, lazyObject, OPTIONS, ProtoCallable } from '@voltiso/util'

import { _CustomDocRef } from '~/DocRef/_CustomDocRef'
import type { WeakDocRef } from '~/DocRef/WeakDocRef'
import type { $$DocRelated } from '~/DocRelated/DocRelated'
import type { ANY_DOC, DocTag } from '~/DocTypes'

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
export interface FixableWeakDocRefSchema<X extends $$DocRelated = ANY_DOC>
	extends s.Schema<WeakDocRef<X>> {}

/** 🫠 Accept any, output weak - but currently weak is just supertype */
export interface FixableWeakDocRefSchema$<X extends $$DocRelated = ANY_DOC>
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
