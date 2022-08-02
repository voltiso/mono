// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Component } from 'react'

import type { Props } from '~/react-types'
import type { InnerProps, InnerProps_Subtype } from '~/Stylable/InnerProps'

/**
 * FC-like types that can be styled using style(...), and have additional props
 * assignable to `P`
 */
type StylableJsxConstruct<P extends Props> = new <PP extends P & InnerProps>(
	props: PP,
) => Component<PP>

export type { StylableJsxConstruct as StylableJsxConstruct_ }

//

/** FC-like types that can be styled using style(...) */
export type IStylableJsxConstruct = new (
	props: InnerProps & InnerProps_Subtype,
) => Component //! OK?

// /** FC-like types that can be styled using style(...) */
// export type IStylableJsxConstruct = new <PP extends InnerProps>(
// 	props: PP & InnerProps_Subtype,
// ) => Component

//

//

//

/** Friends with function overload resolution */
export type StylableJsxConstruct_Infer<PP extends InnerProps> = new (
	props: PP,
) => Required<PP> extends Required<InnerProps> ? Component : never
