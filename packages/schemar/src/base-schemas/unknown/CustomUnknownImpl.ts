// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, lazyConstructor } from '@voltiso/util'

import type { CustomUnknown, UnknownOptions } from '~'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'

export interface CustomUnknownImpl<O> {
	readonly [BASE_OPTIONS]: UnknownOptions
	readonly [DEFAULT_OPTIONS]: UnknownOptions.Default
}

$assert(SCHEMA_NAME)

export class CustomUnknownImpl<O extends UnknownOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknown<O>
{
	readonly [SCHEMA_NAME] = 'Unknown' as const
}
