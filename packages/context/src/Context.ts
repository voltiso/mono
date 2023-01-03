// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { haveAsyncHooks } from './node/asyncHooks'
import { NodeContext } from './node/NodeContext'
import { ZoneContext } from './zone/ZoneContext'

export interface Context<T> {
	run<Return>(value: T, run: () => Return): Return
	get value(): T
}

export interface ContextConstructor {
	new <T>(): Context<T>
}

export const Context: ContextConstructor = haveAsyncHooks()
	? // eslint-disable-next-line etc/no-internal
	  NodeContext
	: // eslint-disable-next-line etc/no-internal
	  ZoneContext
