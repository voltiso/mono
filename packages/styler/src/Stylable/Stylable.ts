// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '~/react-types'

import type { StylableIntrinsic } from './_/StylableIntrinsic'
import type { StylableJsxCall } from './_/StylableJsxCall'
import type { StylableJsxConstruct } from './_/StylableJsxConstruct'

/**
 * Element types that can be styled using style(...), and require P as
 * additional props
 */
export type StylableWithProps<P extends Props> =
	| StylableJsxCall<P>
	| StylableJsxConstruct<P>
	| StylableIntrinsic<P>
