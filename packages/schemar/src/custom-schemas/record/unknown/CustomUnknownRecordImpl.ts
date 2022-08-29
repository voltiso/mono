// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomUnknownRecord,
	DEFAULT_OPTIONS,
	DefaultUnknownRecordOptions,
	ISchema,
	Record,
	SCHEMA_NAME,
	SchemableLike,
	UnknownRecordOptions,
} from '@voltiso/schemar.types'
import { EXTENDS } from '@voltiso/schemar.types'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl, RecordImpl } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownRecordImpl<O> {
	readonly [SCHEMA_NAME]: 'UnknownRecord'

	readonly [DEFAULT_OPTIONS]: DefaultUnknownRecordOptions
	readonly [BASE_OPTIONS]: UnknownRecordOptions
}

export class CustomUnknownRecordImpl<O extends Partial<UnknownRecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownRecord<O>
{
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
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		TKeySchema extends { OutputType: keyof any; InputType: keyof any },
		TValueSchema extends SchemableLike,
	>(
		...args: [TKeySchema, TValueSchema] | [TValueSchema]
	): Record<TKeySchema, TValueSchema> {
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
