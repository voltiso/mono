// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as uuid from 'uuid'

import { NoContextError } from '~/NoContextError'

import type { Context } from '../Context'
import { checkEnv } from './checkEnv'

/**
 * `Context` implementation for NodeJS
 *
 * @internal use `Context` instead
 */
// eslint-disable-next-line etc/underscore-internal
export class ZoneContext<T> implements Context<T> {
	_id = uuid.v4()

	constructor() {
		checkEnv()
	}

	run<Return>(value: T, run: () => Return): Return {
		const zone = Zone.current.fork({
			name: 'ZoneContext',
			properties: { [this._id]: value },
		})

		return zone.run(run)
	}

	get value(): T {
		const value = Zone.current.get(this._id) as T | undefined
		if (value === undefined) throw new NoContextError()
		return value
	}

	get hasValue(): boolean {
		return Zone.current.get(this._id) !== undefined
	}

	get tryGetValue(): T | undefined {
		return Zone.current.get(this._id) as T | undefined
	}
}
