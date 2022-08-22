// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { DefaultRecordOptions, SchemableLike } from '~'
import type * as s from '~'

import type { CustomUnknownRecord } from '.'
import { UnknownRecordImpl } from '.'

export interface UnknownRecord extends CustomUnknownRecord<{}> {
	<
		TKeySchema extends { OutputType: keyof any; InputType: keyof any },
		TValueSchema extends SchemableLike,
	>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): s.Record<TKeySchema, TValueSchema>

	<TValueSchema extends SchemableLike>(valueSchema: TValueSchema): s.Record<
		DefaultRecordOptions['keySchema'],
		TValueSchema
	>
}

export const UnknownRecord = lazyConstructor(
	() => UnknownRecordImpl,
) as unknown as UnknownRecordConstructor

export type UnknownRecordConstructor = new () => UnknownRecord

export const record = lazyValue(() => new UnknownRecord())
