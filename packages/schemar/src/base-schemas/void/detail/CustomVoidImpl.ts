// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import { $fastAssert, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import type { VoidOptions } from '../options/VoidOptions'
import { isVoidSchema } from './isVoid'
import type { IVoid } from './IVoid'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomVoidImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: VoidOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: VoidOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomVoidImpl<O extends Partial<VoidOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IVoid
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Void' as const;

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isVoidSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}
}
