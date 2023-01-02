// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { NodeContext } from './node/NodeContext'
import { ZoneContext } from './zone/ZoneContext'

export interface Context<T> {
	run<Return>(value: T, run: () => Return): Return
	get value(): T
}

function isNode() {
	return typeof window === 'undefined'
}

// eslint-disable-next-line etc/no-internal
export const Context = isNode() ? NodeContext : ZoneContext
