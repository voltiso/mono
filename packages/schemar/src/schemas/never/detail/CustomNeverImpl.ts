// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultNeverOptions, INever, NeverOptions, Schema } from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	SCHEMA_NAME,
} from '~'

export class CustomNeverImpl<O extends Partial<NeverOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements INever
{
	declare readonly [SCHEMA_NAME]: 'Never';
	declare readonly [DEFAULT_OPTIONS]: DefaultNeverOptions;
	declare readonly [BASE_OPTIONS]: NeverOptions;

	// readonly [IS_NEVER] = true as const;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: Schema): boolean {
		return true
	}
}
