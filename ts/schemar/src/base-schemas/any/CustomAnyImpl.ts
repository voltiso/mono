// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, lazyConstructor } from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

import { isSchemaInferrer } from '~/core-schemas/schemaInferrer/ISchemaInferrer'
import { SchemarError } from '~/error'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import { isUnknownSchema } from '../unknown/IUnknown'
import type { AnyOptions } from './AnyOptions'
import { isAnySchema } from './IAny'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomAnyImpl<O> {
	readonly [Voltiso.DEFAULT_OPTIONS]: AnyOptions.Default
	readonly [Voltiso.BASE_OPTIONS]: AnyOptions
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomAnyImpl<
	O extends Partial<AnyOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Any' as const

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isAnySchema(other) || isSchemaInferrer(other) || isUnknownSchema(other))
			return true
		else
			throw new SchemarError(
				'`any extends *` is `boolean` - unable to return `true` or `false`',
			)
	}
}
