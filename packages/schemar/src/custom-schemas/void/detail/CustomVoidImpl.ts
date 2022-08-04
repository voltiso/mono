// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	EXTENDS,
	SCHEMA_NAME,
} from '_'
import { lazyConstructor } from '@voltiso/util'

import type { DefaultVoidOptions, ISchema, IVoid, VoidOptions } from '~'
import { CustomSchemaImpl, isVoid } from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomVoidImpl<O> {
	readonly [BASE_OPTIONS]: VoidOptions
	readonly [DEFAULT_OPTIONS]: DefaultVoidOptions
}

export class CustomVoidImpl<O extends Partial<VoidOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IVoid
{
	readonly [SCHEMA_NAME] = 'Void' as const;

	override [EXTENDS](other: ISchema): boolean {
		if (isVoid(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}
}