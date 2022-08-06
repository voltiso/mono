// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StylableIntrinsic } from './_/StylableIntrinsic'
import type { StylableJsxCall } from './_/StylableJsxCall'
import type { StylableJsxConstruct } from './_/StylableJsxConstruct'

/** Element types that can be styled using style(...), and require P as additional props */
type Stylable<P> =
	| StylableJsxCall<P>
	| StylableJsxConstruct<P>
	| StylableIntrinsic<P>

export type { Stylable as Stylable_ }
