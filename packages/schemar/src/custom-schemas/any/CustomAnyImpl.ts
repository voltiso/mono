// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	AnyOptions,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultAnyOptions,
	Schema,
} from '@voltiso/schemar.types'
import {
	EXTENDS,
	isAny,
	isUnknown,
	isUnknownSchema,
	SCHEMA_NAME,
} from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl, SchemarError } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomAnyImpl<O> {
	readonly [DEFAULT_OPTIONS]: DefaultAnyOptions
	readonly [BASE_OPTIONS]: AnyOptions
}

export class CustomAnyImpl<
	O extends Partial<AnyOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	readonly [SCHEMA_NAME] = 'Any' as const;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](other: Schema): boolean {
		if (isAny(other) || isUnknown(other) || isUnknownSchema(other)) return true
		else
			throw new SchemarError(
				'`any extends *` is `boolean` - unable to return `true` or `false`',
			)
	}
}
