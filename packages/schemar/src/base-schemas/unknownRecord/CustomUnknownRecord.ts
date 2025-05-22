// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { SCHEMA_NAME } from '~/_/symbols'
import type { CustomSchema, CustomSchema$ } from '~/types/Schema/CustomSchema'
import type { Schema, Schema$ } from '~/types/Schema/ISchema'

import type { UnknownRecordOptions } from './UnknownRecordOptions'

$fastAssert(SCHEMA_NAME)

export interface $$UnknownRecord {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownRecord'
}

export function isUnknownRecordSchema(x: unknown): x is IUnknownRecord$ {
	return (
		(x as IUnknownRecord$ | null)?.[Voltiso.Schemar.SCHEMA_NAME] ===
		'UnknownRecord'
	)
}

export function is$$UnknownRecordSchema(x: unknown): x is IUnknownRecord$ {
	return isUnknownRecordSchema(x)
}

//

export interface IUnknownRecord extends Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownRecord'

	readonly [Voltiso.BASE_OPTIONS]: UnknownRecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownRecordOptions.Default

	get getIndexSignatures(): readonly []
	get getShape(): object
}

export interface IUnknownRecord$ extends Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownRecord'

	readonly [Voltiso.BASE_OPTIONS]: UnknownRecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownRecordOptions.Default

	get getIndexSignatures(): readonly []
	get getShape(): object

	//

	get Final(): IUnknownRecord
}

//

export interface CustomUnknownRecord<O extends Partial<UnknownRecordOptions>>
	extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownRecord'

	readonly [Voltiso.BASE_OPTIONS]: UnknownRecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownRecordOptions.Default

	get getIndexSignatures(): readonly []
	get getShape(): object
}

//

export interface CustomUnknownRecord$<O extends Partial<UnknownRecordOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownRecord'

	readonly [Voltiso.BASE_OPTIONS]: UnknownRecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownRecordOptions.Default

	get getIndexSignatures(): readonly []
	get getShape(): object
}
