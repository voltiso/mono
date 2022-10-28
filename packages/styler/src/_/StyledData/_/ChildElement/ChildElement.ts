// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitCall_ } from '@voltiso/util'
import type { ElementType, ReactElement } from 'react'

import type { Props } from '~/react-types'

// export type ChildElement<P extends Props> = (
// 	outerProps: P & { className: never }
// ) => ReactElement | null

export type ChildElement<P extends Props> =
	| OmitCall_<ElementType<{}>>
	// | ((props: P) => ElementType<{}>)
	| ((props: P) => ReactElement | null)
