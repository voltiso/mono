// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactElement } from 'react'

import type { Props } from '~/react-types/Props/Props'

export interface FunctionComponent<P extends Props = {}> {
	(props: P): ReactElement | null
	// (props: P, context?: any): ReactElement<any, any> | null
	// propTypes?: WeakValidationMap<P> | undefined
	// contextTypes?: ValidationMap<any> | undefined
	// defaultProps?: Partial<P> | undefined
	displayName?: string | undefined
}
