// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import { $fastAssert, lazyConstructor } from '@voltiso/util'
import { SCHEMA_NAME } from '_'

import type { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'

import type { CustomUnknownObjectImpl } from '../unknownObject'
import { object } from '../unknownObject'
import type { CustomRecord } from './CustomRecord'
import type { RecordOptions } from './RecordOptions'

$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomRecordImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: RecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: RecordOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomRecordImpl<O extends Partial<RecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomRecord<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Record' as const

	readonly _object: CustomUnknownObjectImpl<any>

	constructor(options: O) {
		super(options)

		this._object = object.index(
			this[Voltiso.OPTIONS].keySchema,
			this[Voltiso.OPTIONS].valueSchema,
		) as never

		Object.freeze(this)
	}

	get getKeySchema(): this[Voltiso.OPTIONS]['keySchema'] {
		return this[Voltiso.OPTIONS].keySchema as never
	}

	get getValueSchema(): this[Voltiso.OPTIONS]['valueSchema'] {
		return this[Voltiso.OPTIONS].valueSchema as never
	}

	get getShape(): {} {
		return {}
	}

	get getIndexSignatures(): any {
		return [
			{
				keySchema: this[Voltiso.OPTIONS].keySchema,
				valueSchema: this[Voltiso.OPTIONS].valueSchema,
			},
		]
	}

	override [Voltiso.Schemar.EXTENDS](_other: Schema): boolean {
		throw new Error('not implemented')
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		return (this._object as any)._getIssues(x, options) as never
	}

	override _fix(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): unknown {
		x = (this._object as any)._fix(x, options) as never
		return x
	}
}
