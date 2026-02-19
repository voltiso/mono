// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IndexedCssProps } from '~/_/CssProps'
import type { PropsFromCssProps } from '~/Styled'

import type { IStyledDataMod } from './IStyledData'

export type GetModProps<
	Mod extends IStyledDataMod<CustomCss>,
	CustomCss extends object,
> =
	Mod['cssProps'] extends IndexedCssProps<CustomCss>
		? PropsFromCssProps<Mod['cssProps'], CustomCss>
		: {}
