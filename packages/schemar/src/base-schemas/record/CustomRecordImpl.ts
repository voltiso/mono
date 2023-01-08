// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { lazyConstructor, OPTIONS } from '@voltiso/util'

import type {
	CustomRecord,
	DefaultRecordOptions,
	ISchema,
	RecordOptions,
	ValidateOptions,
	ValidationIssue,
} from '~'
import { CustomSchemaImpl } from '~'

import type { CustomObjectImpl } from '../object'
import { object } from '../unknownObject'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomRecordImpl<O> {
	readonly [BASE_OPTIONS]: RecordOptions
	readonly [DEFAULT_OPTIONS]: DefaultRecordOptions
}

export class CustomRecordImpl<O extends Partial<RecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomRecord<O>
{
	readonly [SCHEMA_NAME] = 'Record' as const

	get getKeySchema(): this[OPTIONS]['keySchema'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['keySchema'] as never
	}

	get getValueSchema(): this[OPTIONS]['valueSchema'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS]['valueSchema'] as never
	}

	// eslint-disable-next-line class-methods-use-this
	get getShape(): {} {
		return {}
	}

	get getIndexSignatures(): any {
		return [
			{
				// eslint-disable-next-line security/detect-object-injection
				keySchema: this[OPTIONS].keySchema,

				// eslint-disable-next-line security/detect-object-injection
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
		options?: Partial<ValidateOptions> | undefined,
	): ValidationIssue[] {
		const proxy = _getCustomObjectImpl(this)
		return proxy._getIssues(x, options)
	}

	override _fix(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): unknown {
		const proxy = _getCustomObjectImpl(this)
		// eslint-disable-next-line no-param-reassign
		x = proxy._fix(x, options)
		return x
	}
}

function _getCustomObjectImpl(self: {
	[OPTIONS]: RecordOptions
}): CustomObjectImpl<{}> {
	return object.index(
		// eslint-disable-next-line security/detect-object-injection
		self[OPTIONS].keySchema,

		// eslint-disable-next-line security/detect-object-injection
		self[OPTIONS].valueSchema,
	) as never
}
