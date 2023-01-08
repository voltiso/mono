// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable_ } from './BivariantCallable'
import type { BivariantNewable_ } from './BivariantNewable'

export type Bivariant_<Func> = [Func] extends [
	abstract new (...args: any) => any,
]
	? BivariantNewable_<Func>
	: [Func] extends [(...args: any) => any]
	? BivariantCallable_<Func>
	: never

export type Bivariant<
	Func extends ((...args: any) => any) | (abstract new (...args: any) => any),
> = Bivariant_<Func>

//

export type $Bivariant_<Func> = Func extends any ? Bivariant_<Func> : never

export type $Bivariant<
	Func extends ((...args: any) => any) | (abstract new (...args: any) => any),
> = $Bivariant_<Func>
