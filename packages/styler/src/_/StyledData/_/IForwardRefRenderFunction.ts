// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardedRef, ReactNode } from 'react'

export interface IForwardRefRenderFunction {
	(props: any, ref: ForwardedRef<any>): ReactNode
	displayName?: string | undefined

	defaultProps?: never | undefined
	propTypes?: never | undefined
}
