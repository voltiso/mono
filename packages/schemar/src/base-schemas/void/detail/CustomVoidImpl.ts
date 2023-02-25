// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, lazyConstructor } from '@voltiso/util'

import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { ISchema } from '~/types/Schema/ISchema'

import type { VoidOptions } from '../options/VoidOptions'
import { isVoidSchema } from './isVoid'
import type { IVoid } from './IVoid'

$assert(EXTENDS)
$assert(SCHEMA_NAME)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomVoidImpl<O> {
	readonly [BASE_OPTIONS]: VoidOptions
	readonly [DEFAULT_OPTIONS]: VoidOptions.Default
}

export class CustomVoidImpl<O extends Partial<VoidOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IVoid
{
	readonly [SCHEMA_NAME] = 'Void' as const;

	override [EXTENDS](other: ISchema): boolean {
		if (isVoidSchema(other)) return true
		else return super[EXTENDS](other)
	}
}
