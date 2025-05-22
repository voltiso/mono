// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
} from '@voltiso/util'

import type { Record as RecordSchema } from '~/base-schemas/record/record'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { $$Schema, Schema } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import { RecordImpl } from '../record/RecordImpl'
import type { CustomUnknownRecord } from './CustomUnknownRecord'
import type { UnknownRecordOptions } from './UnknownRecordOptions'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownRecordImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownRecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownRecordOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnknownRecordImpl<O extends Partial<UnknownRecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownRecord<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownRecord'

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get getIndexSignatures(): [] {
		return [] as []
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get getShape(): {} {
		return {}
	}

	constructor(o: O) {
		super(o)
		const newThis = BoundCallable(this)
		Object.freeze(newThis)
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
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

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override [Voltiso.Schemar.EXTENDS](_other: Schema): boolean {
		throw new Error('not implemented')
		// if (isObject(other)) {
		// 	return getKeys(other.getShape).length === 0
		// } else if (isUnknownObject(other)) return true
		// // eslint-disable-next-line security/detect-object-injection
		// else return super[Voltiso.Schemar.EXTENDS](other)
	}
}
