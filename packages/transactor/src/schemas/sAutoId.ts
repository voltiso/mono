// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomString, CustomString$ } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { ProtoCallable } from '@voltiso/util'

import type { DocIdBrand, DocIdString } from '~/brand'
import type { $$DocRelated } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

export interface AutoIdSchema<D extends $$DocRelated = AnyDoc>
	extends CustomString<{
		Input: DocIdString<D>
		Output: DocIdString<D>
		// regExps: AtLeast1<RegExpEntry>
	}> {}

export interface AutoIdSchema$<D extends $$DocRelated = AnyDoc>
	extends CustomString$<{
		Input: DocIdString<D>
		Output: DocIdString<D>
		// regExps: AtLeast1<RegExpEntry>
	}> {
	get Final(): AutoIdSchema<D>
}

/** @internal */
export const _sAutoId = s.string
	.name('autoId')
	.regex(/^[\dA-Za-z]{20}$/u, 'be 20 alphanumeric characters')
	.Cast<DocIdString>()

//

export interface UnknownAutoIdSchema extends AutoIdSchema {}

export interface UnknownAutoIdSchema$ extends AutoIdSchema$ {
	<D extends $$DocRelated = AnyDoc>(): AutoIdSchema$<D>

	get Final(): UnknownAutoIdSchema
}

//

export type __hack_sAutoId = DocIdBrand

/** 🧙‍♂️ Validate default auto-generated document ID */
export const sAutoId: UnknownAutoIdSchema$ = ProtoCallable({
	prototype: _sAutoId,

	call: <D extends $$DocRelated>() => _sAutoId.Cast<DocIdString<D>>(),
}) as never
