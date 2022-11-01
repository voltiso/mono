// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as t from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { lazyConstructor, OPTIONS } from '@voltiso/util'

import type { CustomObjectImpl } from '~'
import { CustomSchemaImpl, object } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomRecordImpl<O> {
	readonly [BASE_OPTIONS]: t.RecordOptions
	readonly [DEFAULT_OPTIONS]: t.DefaultRecordOptions
}

export class CustomRecordImpl<O extends Partial<t.RecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements t.CustomRecord<O>
{
	readonly [t.SCHEMA_NAME] = 'Record' as const

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
	override [t.EXTENDS](_other: t.ISchema): boolean {
		throw new Error('not implemented')
	}

	override _getIssuesImpl(x: unknown): t.ValidationIssue[] {
		const proxy = _getCustomObjectImpl(this)
		return proxy._getIssuesImpl(x)
	}

	override _fixImpl(x: unknown): unknown {
		// eslint-disable-next-line no-param-reassign
		x = super._fixImpl(x)
		const proxy = _getCustomObjectImpl(this)
		// eslint-disable-next-line no-param-reassign
		x = proxy._fixImpl(x)
		// eslint-disable-next-line no-param-reassign
		x = super._fixImpl(x)
		return x
	}
}

function _getCustomObjectImpl(self: {
	[OPTIONS]: t.RecordOptions
}): CustomObjectImpl<{}> {
	return object.index(
		// eslint-disable-next-line security/detect-object-injection
		self[OPTIONS].keySchema,

		// eslint-disable-next-line security/detect-object-injection
		self[OPTIONS].valueSchema,
	) as never
}
