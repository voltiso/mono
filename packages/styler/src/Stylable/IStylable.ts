// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IStylableIntrinsic } from './_/StylableIntrinsic'
import type { IStylableJsxCall } from './_/StylableJsxCall/StylableJsxCall'
import type { IStylableJsxConstruct } from './_/StylableJsxConstruct/StylableJsxConstruct'

/** Element types that can be styled using style(...), and require P as additional props */
export type IStylable =
	| IStylableJsxCall
	| IStylableJsxConstruct
	| IStylableIntrinsic
