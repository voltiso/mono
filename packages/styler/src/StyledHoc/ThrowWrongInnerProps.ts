// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'

import type { IsReactNative } from '~/util'

export type ThrowWrongInnerProps = IsReactNative extends true
	? Throw<'Error: `style` prop is missing'>
	: Throw<'Error: `className` prop is missing'>
