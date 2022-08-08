// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardedRef, ReactElement } from 'react'

export interface IForwardRefRenderFunction {
	(props: any, ref: ForwardedRef<any>): ReactElement | null
	displayName?: string | undefined

	defaultProps?: never | undefined
	propTypes?: never | undefined
}
