// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny, Not } from '@voltiso/util'
import type { View } from 'react-native'

import type { StylerConfig } from '../StylerConfig-declaration-merging'

/**
 * Determine environment - assumes `react-native` if there's no global
 * `document` object
 */
export type IsReactNative = StylerConfig extends { isReactNative: boolean }
	? StylerConfig['isReactNative']
	: Not<IsAny<View>>
