// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/schemar.types'
import type {
	CustomUnknown,
	DefaultUnknownOptions,
	UnknownOptions,
} from '@voltiso/schemar.types'
import { SCHEMA_NAME } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~'

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
