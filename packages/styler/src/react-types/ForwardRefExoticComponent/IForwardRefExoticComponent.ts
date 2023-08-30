// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactNode, WeakValidationMap } from 'react'

import type { Props } from '../Props'

export interface IExoticComponent {
	(props: any): ReactNode
	readonly $$typeof: symbol
}

export interface INamedExoticComponent extends IExoticComponent {
	displayName?: string | undefined
}

export interface IForwardRefExoticComponent<P extends Props = Props>
	extends INamedExoticComponent {
	defaultProps?: Partial<P> | undefined
	propTypes?: WeakValidationMap</* P*/ any> | undefined
}
