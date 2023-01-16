// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	CustomUnknownRecord,
	CustomUnknownRecord$,
	GetFinalSchema,
	Record,
	Record$,
	RecordOptions,
} from '~'
import { UnknownRecordImpl } from '~'

export interface UnknownRecord extends CustomUnknownRecord<{}> {}

export interface UnknownRecord$ extends CustomUnknownRecord$<{}> {
	<
		TKeySchema extends $$Schema & {
			Output: keyof any
			Input: keyof any
		},
		TValueSchema extends $$Schemable,
	>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): Record$<
		Assume<
			$$Schema & {
				Output: keyof any
				Input: keyof any | undefined
			},
			GetFinalSchema<TKeySchema>
		>,
		GetFinalSchema<TValueSchema>
	>

	<TValueSchema extends $$Schemable>(valueSchema: TValueSchema): Record<
		RecordOptions.Default['keySchema'],
		TValueSchema
	>
}

export const UnknownRecord$ = lazyConstructor(
	() => UnknownRecordImpl,
) as unknown as UnknownRecord$Constructor

export type UnknownRecord$Constructor = new () => UnknownRecord$

export const record = lazyValue(() => new UnknownRecord$())
