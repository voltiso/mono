// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	CustomUnknownRecord,
	DefaultRecordOptions,
	Record,
} from '~'

import { UnknownRecordImpl } from '.'

export interface UnknownRecord extends CustomUnknownRecord<{}> {
	<
		TKeySchema extends $$Schema & {
			Output: keyof any
			Input: keyof any
		},
		TValueSchema extends $$Schemable,
	>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): Record<TKeySchema, TValueSchema>

	<TValueSchema extends $$Schemable>(valueSchema: TValueSchema): Record<
		DefaultRecordOptions['keySchema'],
		TValueSchema
	>
}

export const UnknownRecord = lazyConstructor(
	() => UnknownRecordImpl,
) as unknown as UnknownRecordConstructor

export type UnknownRecordConstructor = new () => UnknownRecord

export const record = lazyValue(() => new UnknownRecord())
