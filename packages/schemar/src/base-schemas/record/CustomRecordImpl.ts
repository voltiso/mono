// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { lazyConstructor, OPTIONS } from '@voltiso/util'

import type {
	CustomRecord,
	ISchema,
	RecordOptions,
	ValidationIssue,
	ValidationOptions,
} from '~'
import { CustomSchemaImpl } from '~'

import type { CustomUnknownObjectImpl } from '../unknownObject'
import { object } from '../unknownObject'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomRecordImpl<O> {
	readonly [BASE_OPTIONS]: RecordOptions
	readonly [DEFAULT_OPTIONS]: RecordOptions.Default
}

export class CustomRecordImpl<O extends Partial<RecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomRecord<O>
{
	readonly [SCHEMA_NAME] = 'Record' as const

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
		return this[OPTIONS]['keySchema'] as never
	}

	get getValueSchema(): this[OPTIONS]['valueSchema'] {
		return this[OPTIONS]['valueSchema'] as never
	}

	// eslint-disable-next-line class-methods-use-this
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

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: ISchema): boolean {
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
