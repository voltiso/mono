// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ArrowCallableOptions } from '../ArrowCallableOptions'

//

/** @internal Use `ArrowCallable` instead */
export type IArrowCallable = ArrowCallableOptions['shape'] &
	ArrowCallableOptions['call'] &
	Record<keyof CallableFunction, never>

/** @internal Use `ArrowCallable` instead */
export type _ArrowCallable<Options extends ArrowCallableOptions> =
	Options['shape'] & Options['call'] & Record<keyof CallableFunction, never>

//
