// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomUnknown,
	DEFAULT_OPTIONS,
	DefaultUnknownOptions,
	UnknownOptions,
} from '@voltiso/schemar.types'
import { SCHEMA_NAME } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'

export interface CustomUnknownImpl<O> {
	readonly [BASE_OPTIONS]: UnknownOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownOptions
}

export class CustomUnknownImpl<O extends UnknownOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknown<O>
{
	readonly [SCHEMA_NAME] = 'Unknown' as const
}
