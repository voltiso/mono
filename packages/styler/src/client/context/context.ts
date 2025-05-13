// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import { createContext } from 'react'

import type { NativeRenderer, WebRenderer } from '~/renderer'
import type { IsReactNative } from '~/util'

export const RendererContext =
	createContext<
		IsReactNative extends true
			? NativeRenderer | null
			: IsReactNative extends false
				? WebRenderer | null
				: never
	>(null)

export const ThemeContext = createContext<object | null>(null)
