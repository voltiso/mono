// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, lazyConstructor } from '@voltiso/util'

import type { AnyOptions, Schema } from '~'
import {
	CustomSchemaImpl,
	isAnySchema,
	isSchemaInferrer,
	isUnknownSchema,
} from '~'
import { SchemarError } from '~/error'

$assert(EXTENDS)
$assert(SCHEMA_NAME)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomAnyImpl<O> {
	readonly [DEFAULT_OPTIONS]: AnyOptions.Default
	readonly [BASE_OPTIONS]: AnyOptions
}

export class CustomAnyImpl<
	O extends Partial<AnyOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	readonly [SCHEMA_NAME] = 'Any' as const;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](other: Schema): boolean {
		if (isAnySchema(other) || isSchemaInferrer(other) || isUnknownSchema(other))
			return true
		else
			throw new SchemarError(
				'`any extends *` is `boolean` - unable to return `true` or `false`',
			)
	}
}
