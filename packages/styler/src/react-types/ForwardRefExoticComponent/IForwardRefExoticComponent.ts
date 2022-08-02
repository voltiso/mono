// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactElement, WeakValidationMap } from 'react'

import type { Props as Properties } from '~'

export interface IExoticComponent {
	(props: any): ReactElement | null
	readonly $$typeof: symbol
}

export interface INamedExoticComponent extends IExoticComponent {
	displayName?: string | undefined
}

export interface IForwardRefExoticComponent<P extends Properties = Properties>
	extends INamedExoticComponent {
	defaultProps?: Partial<P> | undefined
	propTypes?: WeakValidationMap</* P*/ any> | undefined
}
