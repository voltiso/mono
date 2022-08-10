// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentPropsWithRef, ElementType } from 'react'

import type { MergeProps_ } from '~'

/** Distribute over `P` and `C` */
export type $GetStyledProps<P, C> = P extends any
	? C extends null
		? P
		: C extends ElementType
		? MergeProps_<ComponentPropsWithRef<C>, P>
		: never
	: never
