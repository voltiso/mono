// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitCall_ } from '@voltiso/util'
import type { ElementType, ReactElement } from 'react'

export type IChildElement =
	| OmitCall_<ElementType<{}>>
	// | ((props: any) => ElementType<{}>)
	| ((props: any) => ReactElement) // | null
