// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import { useContext } from 'react'

import type { NativeRenderer } from '~/renderer/index.js'

import { RendererContext, ThemeContext } from './context'

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __hack_useContext = NativeRenderer

export const useRenderer = () => useContext(RendererContext)

export const useTheme = <Theme extends object>() =>
	useContext<Theme | null>(ThemeContext as never)
