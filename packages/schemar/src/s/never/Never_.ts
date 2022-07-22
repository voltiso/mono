// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../schema'
import { Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import type { DefaultNeverOptions, NeverOptions } from './_/NeverOptions.js'
import { defaultNeverOptions } from './_/NeverOptions.js'
import type { INever } from './INever.js'
import { IS_NEVER } from './INever.js'

class Never__<O extends NeverOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements INever<O>
{
	readonly [IS_NEVER] = true as const;

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: ISchema): boolean {
		return true
	}
}

//

export class Never_ extends Never__<DefaultNeverOptions> {
	constructor() {
		super(defaultNeverOptions as never)
	}
}
