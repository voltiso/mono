// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactNode } from 'react'

import type { Props, ReactNodeLike } from '~/react-types'
import type { InnerProps } from '~/Stylable/InnerProps'

/**
 * FC-like types that can be styled using style(...), and have additional props
 * assignable to `P`
 */
export type StylableJsxCall_<P extends Props> = {
	bivarianceHack(props: P & InnerProps): ReactNode // ReactElement | null
}['bivarianceHack']

//

export type StylableJsxCallLike = (props: any) => ReactNodeLike // ReactElementLike | null

/** FC-like types that can be styled using style(...) */
export type IStylableJsxCall = {
	bivarianceHack(props: InnerProps): ReactNode // ReactElement | null
}['bivarianceHack']
