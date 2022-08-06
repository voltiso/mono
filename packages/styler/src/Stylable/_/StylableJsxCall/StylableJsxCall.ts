// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ReactElement } from 'react'

import type { Props } from '~/react-types'
import type { InnerProps, InnerPropsSubtype } from '~/Stylable/InnerProps'

/**
 * FC-like types that can be styled using style(...), and have additional props
 * assignable to `P`
 */
interface StylableJsxCall<P extends Props> {
	(props: P & InnerProps): ReactElement | null //! OK?
	// <PP extends P & InnerProps>(props: PP): ReactElement | null
}

export type { StylableJsxCall as StylableJsxCall_ }

//

/** FC-like types that can be styled using style(...) */
export interface IStylableJsxCall {
	(props: InnerProps & InnerPropsSubtype): ReactElement | null //! OK?
	// <PP extends InnerProps>(props: PP & InnerProps_Subtype): ReactElement | null
}

//

//

//

/** Friends with function overload resolution */
export interface StylableJsxCallInfer<PP extends InnerProps> {
	(props: PP): Required<PP> extends Required<InnerProps>
		? ReactElement | null
		: never
}
