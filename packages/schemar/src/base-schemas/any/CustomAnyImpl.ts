// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $fastAssert, lazyConstructor } from '@voltiso/util'

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
export interface CustomAnyImpl<O> {
	readonly [DEFAULT_OPTIONS]: AnyOptions.Default
	readonly [BASE_OPTIONS]: AnyOptions
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomAnyImpl<
	O extends Partial<AnyOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [SCHEMA_NAME] = 'Any' as const;

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override [EXTENDS](other: Schema): boolean {
		if (isAnySchema(other) || isSchemaInferrer(other) || isUnknownSchema(other))
			return true
		else
			throw new SchemarError(
				'`any extends *` is `boolean` - unable to return `true` or `false`',
			)
	}
}
