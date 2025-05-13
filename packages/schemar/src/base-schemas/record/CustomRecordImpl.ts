// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { lazyConstructor, OPTIONS } from '@voltiso/util'

import type { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'

import type { CustomUnknownObjectImpl } from '../unknownObject'
import { object } from '../unknownObject'
import type { CustomRecord } from './CustomRecord'
import type { RecordOptions } from './RecordOptions'

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomRecordImpl<O> {
	readonly [BASE_OPTIONS]: RecordOptions
	readonly [DEFAULT_OPTIONS]: RecordOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomRecordImpl<O extends Partial<RecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomRecord<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [SCHEMA_NAME] = 'Record' as const

	// eslint-disable-next-line es-x/no-class-instance-fields
	readonly _object: CustomUnknownObjectImpl<any>

	constructor(options: O) {
		super(options)

		this._object = object.index(
			this[OPTIONS].keySchema,
			this[OPTIONS].valueSchema,
		) as never

		Object.freeze(this)
	}

	get getKeySchema(): this[OPTIONS]['keySchema'] {
		return this[OPTIONS].keySchema as never
	}

	get getValueSchema(): this[OPTIONS]['valueSchema'] {
		return this[OPTIONS].valueSchema as never
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	get getShape(): {} {
		return {}
	}

	get getIndexSignatures(): any {
		return [
			{
				keySchema: this[OPTIONS].keySchema,
				valueSchema: this[OPTIONS].valueSchema,
			},
		]
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override [EXTENDS](_other: Schema): boolean {
		throw new Error('not implemented')
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		return (this._object as any)._getIssues(x, options) as never
	}

	override _fix(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): unknown {
		// eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
		x = (this._object as any)._fix(x, options) as never
		return x
	}
}
