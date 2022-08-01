// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, PARTIAL_OPTIONS } from '_'
import { EXTENDS, SCHEMA_NAME } from '_'
import type { Assume } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type {
	DefaultNeverOptions,
	INever,
	MergeSchemaOptions,
	NeverOptions,
	Schema,
} from '~'
import { CustomSchemaImpl } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomNeverImpl<O> {
	readonly [DEFAULT_OPTIONS]: DefaultNeverOptions
	readonly [BASE_OPTIONS]: NeverOptions

	readonly [PARTIAL_OPTIONS]: O
	readonly [OPTIONS]: Assume<
		NeverOptions,
		MergeSchemaOptions<DefaultNeverOptions, O>
	>
}

export class CustomNeverImpl<O extends Partial<NeverOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements INever
{
	readonly [SCHEMA_NAME] = 'Never' as const;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: Schema): boolean {
		return true
	}
}
