// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'
import { lazyConstructor, lazyFunction } from '@voltiso/util'

import type { GetFinalSchema } from '~/types/GetFinalSchema'
import type { $$Schema } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'
import type { RecordOptions } from '../record/RecordOptions'
import type { Record$, Record as RecordSchema } from '../record/record'
import type {
	CustomUnknownRecord,
	CustomUnknownRecord$,
} from './CustomUnknownRecord'
import { UnknownRecordImpl } from './UnknownRecordImpl'

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
		GetFinalSchema<TValueSchema> & $$Schemable
	>

	<TValueSchema extends $$Schemable>(
		valueSchema: TValueSchema,
	): RecordSchema<RecordOptions.Default['keySchema'], TValueSchema>
}

export const UnknownRecord$ = lazyConstructor(
	() => UnknownRecordImpl,
) as unknown as UnknownRecord$Constructor

export type UnknownRecord$Constructor = new () => UnknownRecord$

export const record = lazyFunction(() => new UnknownRecord$())
