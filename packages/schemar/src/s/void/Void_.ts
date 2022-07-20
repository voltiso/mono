// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import { lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../schema'
import { Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import type { DefaultVoidOptions, VoidOptions } from './_/VoidOptions.js'
import { defaultVoidOptions } from './_/VoidOptions.js'
import type { IVoid } from './IVoid.js'
import { IS_VOID } from './IVoid.js'

class Void__<O extends VoidOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements IVoid<O>
{
	readonly [IS_VOID] = true as const;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: ISchema): boolean {
		return true
	}
}

//

export class Void_ extends Void__<DefaultVoidOptions> {
	constructor() {
		super(defaultVoidOptions as never)
	}
}
