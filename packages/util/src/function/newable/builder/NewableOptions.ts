// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '~/type'

export interface NewableOptions {
	/** Constructor parameters */
	parameters: unknown[]

	/** Return type (instance type) */
	return: unknown
}

export interface DefaultNewableOptions extends NewableOptions {
	parameters: any
}

//

export type GetNewableOptions<O extends Partial<NewableOptions>> = Override<
	DefaultNewableOptions,
	O
>
