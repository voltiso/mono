// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $fastAssert, lazyConstructor } from '@voltiso/util'

import type { CustomUnknown, UnknownOptions } from '~'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'

export interface CustomUnknownImpl<O> {
	readonly [BASE_OPTIONS]: UnknownOptions
	readonly [DEFAULT_OPTIONS]: UnknownOptions.Default
}

$fastAssert(SCHEMA_NAME)

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnknownImpl<O extends UnknownOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknown<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [SCHEMA_NAME] = 'Unknown' as const

	constructor(options: O) {
		super(options)
		Object.freeze(this)
	}
}
