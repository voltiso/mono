// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import type { CustomObjectImpl } from '~'
import { object } from '~'
import { CustomSchemaImpl } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomRecordImpl<O> {
	readonly [t.BASE_OPTIONS]: t.RecordOptions
	readonly [t.DEFAULT_OPTIONS]: t.DefaultRecordOptions
}

export class CustomRecordImpl<O extends Partial<t.RecordOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements t.CustomRecord<O>
{
	readonly [t.SCHEMA_NAME] = 'Record' as const

	get getKeySchema(): this[t.OPTIONS]['keySchema'] {
		return this[t.OPTIONS]['keySchema'] as never
	}

	get getValueSchema(): this[t.OPTIONS]['valueSchema'] {
		return this[t.OPTIONS]['valueSchema'] as never
	}

	// eslint-disable-next-line class-methods-use-this
	get getShape(): {} {
		return {}
	}

	get getIndexSignatures(): any {
		return [
			{
				keySchema: this[t.OPTIONS].keySchema,

				valueSchema: this[t.OPTIONS].valueSchema,
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
	[t.OPTIONS]: t.RecordOptions
}): CustomObjectImpl<{}> {
	return object.index(
		self[t.OPTIONS].keySchema,

		self[t.OPTIONS].valueSchema,
	) as never
}
