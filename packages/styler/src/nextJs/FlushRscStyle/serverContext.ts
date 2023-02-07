// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createServerContext } from 'react'

export type RscStyle = {
	/** `id` */
	k: number

	/** `string` content */
	v: string
}

/** `string` to be passed to client over network */
export const RscStyleContext =
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	createServerContext && createServerContext<RscStyle | null>(`RscStyle`, null)
