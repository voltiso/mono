// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitCall } from '@voltiso/util'
import type { ElementType, ReactElement } from 'react'

export type IChildElement =
	| OmitCall<ElementType<{}>>
	// | ((props: any) => ElementType<{}>)
	| ((props: any) => ReactElement | null)
