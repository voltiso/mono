// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { DefaultVoidOptions, ISchema, IVoid, VoidOptions } from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isVoid,
	SCHEMA_NAME,
} from '~'

export class CustomVoidImpl<O extends Partial<VoidOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements IVoid
{
	declare readonly [SCHEMA_NAME]: 'Void';

	declare readonly [BASE_OPTIONS]: VoidOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultVoidOptions;

	override [EXTENDS](other: ISchema): boolean {
		if (isVoid(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}
}
