// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $fastAssert, lazyConstructor } from '@voltiso/util'

import type { CustomUnknown, UnknownOptions } from '~'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'

$fastAssert(SCHEMA_NAME)

export interface CustomUnknownImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnknownImpl<O extends UnknownOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknown<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Unknown' as const

	constructor(options: O) {
		super(options)
		Object.freeze(this)
	}
}
