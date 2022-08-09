// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ComponentPropsWithoutRef, ElementType } from 'react'

import type { MergeProps_ } from '~'

export type GetStyledProps<P, C> = C extends null
	? P
	: C extends ElementType
	? MergeProps_<ComponentPropsWithoutRef<C>, P>
	: never
