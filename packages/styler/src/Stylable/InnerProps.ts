// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StyleProp } from 'react-native'

import type { Props } from '~/react-types'
import type { IsReactNative } from '~/util'

export interface WebInnerProps extends Props {
	className?: string | undefined
}

export interface NativeInnerProps extends Props {
	style?: StyleProp<any> | undefined
}

export type InnerProps = IsReactNative extends true
	? NativeInnerProps
	: IsReactNative extends false
		? WebInnerProps
		: never

export type InnerPropsSubtype = { -readonly [k in keyof InnerProps]-?: never }
