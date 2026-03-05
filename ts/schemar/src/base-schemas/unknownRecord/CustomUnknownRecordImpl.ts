// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
} from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

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
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomUnknownRecordImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownRecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownRecordOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomUnknownRecordImpl<O extends Partial<UnknownRecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownRecord<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownRecord'

	get getIndexSignatures(): [] {
		return [] as []
	}

	get getShape(): {} {
		return {}
	}

	constructor(o: O) {
		super(o)
		const newThis = BoundCallable(this)
		Object.freeze(newThis)

		// biome-ignore lint/correctness/noConstructorReturn: hacky hacky
		return newThis
	}

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

	override [Voltiso.Schemar.EXTENDS](_other: Schema): boolean {
		throw new Error('not implemented')
		// if (isObject(other)) {
		// 	return getKeys(other.getShape).length === 0
		// } else if (isUnknownObject(other)) return true
		// else return super[Voltiso.Schemar.EXTENDS](other)
	}
}
