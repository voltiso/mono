// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import { useContext } from 'react'

import type { NativeRenderer, WebRenderer } from '~/renderer/index.js'
import type { IsReactNative } from '~/util'

import { RendererContext, ThemeContext } from './context'

export type __hack_useContext = NativeRenderer

export type UseRendererResult = IsReactNative extends true
	? NativeRenderer | null
	: IsReactNative extends false
		? WebRenderer | null
		: never

export function useRenderer(): UseRendererResult {
	return useContext(RendererContext)
}

export function useTheme<Theme extends object>(): Theme | null {
	return useContext<Theme | null>(ThemeContext as never)
}
