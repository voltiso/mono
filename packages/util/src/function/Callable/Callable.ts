// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoThis } from './noThis'

export type Callable<
	Args extends unknown[] = any[],
	R = unknown,
	This = NoThis,
> = [This] extends [NoThis]
	? (...args: Args) => R
	: (this: This, ...args: Args) => R

export interface CallableWithThis<
	Args extends unknown[] = any[],
	R = unknown,
	This = never,
> {
	(this: This, ...args: Args): R
}
