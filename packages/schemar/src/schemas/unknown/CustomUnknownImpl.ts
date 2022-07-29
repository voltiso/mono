// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { CustomUnknown, DefaultUnknownOptions, UnknownOptions } from '~'
import { BASE_OPTIONS, CustomSchemaImpl, DEFAULT_OPTIONS, SCHEMA_NAME } from '~'

export class CustomUnknownImpl<O extends UnknownOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknown<O>
{
	declare readonly [SCHEMA_NAME]: 'Unknown';
	declare readonly [BASE_OPTIONS]: UnknownOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultUnknownOptions
}
