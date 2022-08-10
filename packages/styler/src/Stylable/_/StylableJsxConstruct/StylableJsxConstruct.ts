// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Component } from 'react'

import type { Props } from '~/react-types'
import type { InnerProps } from '~/Stylable/InnerProps'

/**
 * Class-like types that can be styled using style(...), and have additional
 * props assignable to `P`
 */
type StylableJsxConstruct<P extends Props> = new <PP extends P & InnerProps>(
	props: PP,
) => Component<PP>

export type { StylableJsxConstruct as StylableJsxConstruct_ }

//

declare class IStylableJsxBivarianceHack extends Component {
	constructor(props: InnerProps)
}

/** Class-like types that can be styled using style(...) */
export type IStylableJsxConstruct = typeof IStylableJsxBivarianceHack

// export type IStylableJsxConstruct = { new (props: any): Component } //! OK?
// export type IStylableJsxConstruct = new (
// 	props: InnerProps & InnerPropsSubtype,
// ) => Component //! OK?
