// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type {
	$$Schema,
	CustomString,
	RegExpEntry,
} from '@voltiso/schemar.types'
import type { AtLeast1 } from '@voltiso/util'
import { $Assert, ProtoCallable } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { $$DocRelated } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

export interface AutoIdSchema<D extends $$DocRelated = AnyDoc>
	extends CustomString<{
		Input: DocIdString<D>
		Output: DocIdString<D>
		regExps: AtLeast1<RegExpEntry>
	}> {}

$Assert.is<ConfigurableAutoIdSchema, $$Schema>()

/** @internal */
export const _sAutoId = s.string
	.withName('autoId')
	.regex(/^[\dA-Za-z]{20}$/u, 'be 20 alphanumeric characters')
	.Cast<DocIdString>()

export interface ConfigurableAutoIdSchema extends AutoIdSchema {
	<D extends $$DocRelated = AnyDoc>(): AutoIdSchema<D>
}

/** 🧙‍♂️ Validate default auto-generated document ID */
export const sAutoId: ConfigurableAutoIdSchema = ProtoCallable({
	// eslint-disable-next-line etc/no-internal
	prototype: _sAutoId,
	// eslint-disable-next-line etc/no-internal
	call: <D extends $$DocRelated>() => _sAutoId.Cast<DocIdString<D>>(),
}) as never
