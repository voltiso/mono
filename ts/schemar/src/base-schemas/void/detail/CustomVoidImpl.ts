// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, lazyConstructor } from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import type { VoidOptions } from '../options/VoidOptions'
import type { IVoid } from './IVoid'
import { isVoidSchema } from './isVoid'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomVoidImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: VoidOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: VoidOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomVoidImpl<O extends Partial<VoidOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IVoid
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Void' as const

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isVoidSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}
}
