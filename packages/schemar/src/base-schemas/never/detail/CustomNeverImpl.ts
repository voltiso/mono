// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import { $fastAssert, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { SchemaLike } from '~/types/Schema/ISchema'

import type { NeverOptions } from '../NeverOptions'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomNeverImpl<O> {
	readonly [Voltiso.DEFAULT_OPTIONS]: NeverOptions.Default
	readonly [Voltiso.BASE_OPTIONS]: NeverOptions
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomNeverImpl<
	O extends Partial<NeverOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Never' as const;

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override [Voltiso.Schemar.EXTENDS](_other: SchemaLike): boolean {
		return true
	}
}
