// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../schema'
import { Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import type { DefaultVoidOptions, VoidOptions } from './_/VoidOptions.js'
import { defaultVoidOptions } from './_/VoidOptions.js'
import { IS_VOID, isVoid } from './isVoid.js'
import type { IVoid } from './IVoid.js'

class Void__<O extends VoidOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements IVoid<O>
{
	readonly [IS_VOID] = true as const;

	override [EXTENDS](other: ISchema): boolean {
		if (isVoid(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}
}

//

export class Void_ extends Void__<DefaultVoidOptions> {
	constructor() {
		super(defaultVoidOptions as never)
	}
}
