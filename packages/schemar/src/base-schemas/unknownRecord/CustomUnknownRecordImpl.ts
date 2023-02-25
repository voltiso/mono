// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import type { Record as RecordSchema } from '~/base-schemas/record/record'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { $$Schema, ISchema } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import { RecordImpl } from '../record/RecordImpl'
import type { CustomUnknownRecord } from './CustomUnknownRecord'
import type { UnknownRecordOptions } from './UnknownRecordOptions'

$assert(SCHEMA_NAME)
$assert(EXTENDS)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownRecordImpl<O> {
	readonly [BASE_OPTIONS]: UnknownRecordOptions
	readonly [DEFAULT_OPTIONS]: UnknownRecordOptions.Default
}

export class CustomUnknownRecordImpl<O extends Partial<UnknownRecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownRecord<O>
{
	readonly [SCHEMA_NAME] = 'UnknownRecord'

	// eslint-disable-next-line class-methods-use-this
	get getIndexSignatures() {
		return [] as []
	}

	// eslint-disable-next-line class-methods-use-this
	get getShape() {
		return {}
	}

	constructor(o: O) {
		super(o)
		const newThis = BoundCallable(this)
		Object.freeze(newThis)
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		TKeySchema extends $$Schema & {
			Output: keyof any
			Input: keyof any
		},
		TValueSchema extends $$Schemable,
	>(
		...args: [TKeySchema, TValueSchema] | [TValueSchema]
	): RecordSchema<TKeySchema, TValueSchema> {
		return new RecordImpl(...(args as [any, any])) as never
	}

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: ISchema): boolean {
		throw new Error('not implemented')
		// if (isObject(other)) {
		// 	return getKeys(other.getShape).length === 0
		// } else if (isUnknownObject(other)) return true
		// // eslint-disable-next-line security/detect-object-injection
		// else return super[EXTENDS](other)
	}
}
