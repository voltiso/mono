// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, lazyConstructor } from '@voltiso/util'
import { SCHEMA_NAME } from '_'

import type { CustomUnknown, UnknownOptions } from '~'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'

$fastAssert(SCHEMA_NAME)

// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomUnknownImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
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
