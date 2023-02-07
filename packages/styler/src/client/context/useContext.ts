// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import { useContext } from 'react'

import { RendererContext, ThemeContext } from './context'

export const useRenderer = () => useContext(RendererContext)

export const useTheme = <Theme extends object>() =>
	useContext<Theme | null>(ThemeContext as never)
