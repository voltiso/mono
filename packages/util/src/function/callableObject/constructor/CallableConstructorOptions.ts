// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Bivariant, Callable, Constructor } from '~/function'

export interface CallableConstructorOptions {
	constructor: Constructor
	call: Bivariant<Callable<Record<'this', this['constructor']>>>
}
