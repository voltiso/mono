// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'

import type { IsReactNative } from '../IsReactNative.js'

export type ThrowWrongInnerProps = IsReactNative extends true
	? Throw<'Error: `style` prop is missing'>
	: Throw<'Error: `className` prop is missing'>
