// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	DefaultNeverOptions,
	NeverOptions,
	SchemaLike,
} from '@voltiso/schemar.types'
import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
} from '@voltiso/schemar.types/src/_'
import { EXTENDS, SCHEMA_NAME } from '@voltiso/schemar.types/src/_'
import { lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomNeverImpl<O> {
	readonly [DEFAULT_OPTIONS]: DefaultNeverOptions
	readonly [BASE_OPTIONS]: NeverOptions
}

export class CustomNeverImpl<
	O extends Partial<NeverOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	readonly [SCHEMA_NAME] = 'Never' as const;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: SchemaLike): boolean {
		return true
	}
}
