// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { lazyConstructor } from '@voltiso/util'

import { Schema_ } from '../../schema'
import type {
	DefaultUnknownOptions,
	UnknownOptions,
} from './_/UnknownOptions.js'
import { defaultUnknownOptions } from './_/UnknownOptions.js'
import type { CustomUnknown } from './CustomUnknown.js'
import { IS_UNKNOWN } from './IUnknown.js'

class Unknown__<O extends UnknownOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomUnknown<O>
{
	readonly [IS_UNKNOWN] = true as const

	constructor(o: O) {
		assert(o)
		super(o)
	}
}

export class Unknown_ extends Unknown__<DefaultUnknownOptions> {
	constructor() {
		assert(defaultUnknownOptions)
		super(defaultUnknownOptions)
	}
}
