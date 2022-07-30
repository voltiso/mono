// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { AnyOptions, DefaultAnyOptions, IAny, Schema } from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	SCHEMA_NAME,
} from '~'

export class CustomAnyImpl<O extends Partial<AnyOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IAny
{
	declare readonly [SCHEMA_NAME]: 'Any';

	declare readonly [DEFAULT_OPTIONS]: DefaultAnyOptions;
	declare readonly [BASE_OPTIONS]: AnyOptions;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: Schema): boolean {
		return true
	}
}
