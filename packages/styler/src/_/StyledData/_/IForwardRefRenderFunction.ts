// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardedRef, ReactNode } from 'react'

export interface IForwardRefRenderFunction {
	(props: any, ref: ForwardedRef<any>): ReactNode
	displayName?: string | undefined

	// eslint-disable-next-line sonarjs/no-redundant-type-constituents
	defaultProps?: never | undefined
	// eslint-disable-next-line sonarjs/no-redundant-type-constituents
	propTypes?: never | undefined
}
