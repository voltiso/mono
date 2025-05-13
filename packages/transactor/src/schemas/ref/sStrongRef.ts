// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import {
	$fastAssert,
	lazyFunction,
	lazyObject,
	ProtoCallable,
} from '@voltiso/util'

import { _CustomDocRef } from '~/DocRef/_CustomDocRef'
import type { GetDocRef } from '~/DocRef/GetDocRef'
import type { DocRef } from '~/DocRef/StrongDocRef'
import type { $$DocRelated, $$DocRelatedLike } from '~/DocRelated/DocRelated'
import type { GetDocRepresentative, GetDocTag } from '~/DocRelated/GetDocTag'
import type { AnyDoc } from '~/DocTypes'

/** @internal */
export const _strongRefSchema = lazyObject(() => {
	$fastAssert(_CustomDocRef)

	return s
		.instance(_CustomDocRef)
		.check(x => x.isStrong, 'be strong ref') as unknown as s.Schema<
		GetDocRef<{ isStrong: true }>
	>
})

/** @internal */
export const _strongRefCall = <X extends $$DocRelatedLike>(): s.Schema<
	GetDocRef<{ isStrong: true; doc: GetDocTag<X> }>
> => _strongRefSchema as never

//

//

export interface StrongDocRefSchema<X extends $$DocRelated = AnyDoc>
	extends s.Schema<DocRef<X>> {}

export interface StrongDocRefSchema$<X extends $$DocRelated = AnyDoc>
	extends s.Schema$<DocRef<X>> {
	//
	get Final(): StrongDocRefSchema<X>
}

//

export interface UnknownStrongDocRefSchema extends s.Schema<DocRef> {}

export interface UnknownStrongDocRefSchema$ extends s.Schema$<DocRef> {
	<X extends $$DocRelated>(): StrongDocRefSchema$<GetDocRepresentative<X>>

	get Final(): UnknownStrongDocRefSchema
}

//

/** Strong document reference schema (same as {@link sRef}) */
export const sStrongRef: UnknownStrongDocRefSchema$ = lazyFunction(
	() =>
		ProtoCallable({
			prototype: _strongRefSchema,

			call: _strongRefCall,
		}) as never,
)

/** Strong document reference schema (same as {@link sStrongRef}) */
export const sRef = sStrongRef
