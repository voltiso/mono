import { lazyConstructor } from '@voltiso/ts-util/class'
import { Schema_ } from '../../schema'
import { CustomUnknown } from './CustomUnknown'
import { IS_UNKNOWN } from './IUnknown'
import {
	defaultUnknownOptions,
	DefaultUnknownOptions,
	UnknownOptions,
} from './_/UnknownOptions'

class Unknown__<O extends UnknownOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomUnknown<O>
{
	readonly [IS_UNKNOWN] = true as const

	constructor(o: O) {
		super(o)
	}
}

export class Unknown_ extends Unknown__<DefaultUnknownOptions> {
	constructor() {
		super(defaultUnknownOptions)
	}
}
