// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, lazyConstructor } from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { SchemaLike } from '~/types/Schema/ISchema'

import type { NeverOptions } from '../NeverOptions'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomNeverImpl<O> {
	readonly [Voltiso.DEFAULT_OPTIONS]: NeverOptions.Default
	readonly [Voltiso.BASE_OPTIONS]: NeverOptions
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomNeverImpl<
	O extends Partial<NeverOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Never' as const

	override [Voltiso.Schemar.EXTENDS](_other: SchemaLike): boolean {
		return true
	}
}
