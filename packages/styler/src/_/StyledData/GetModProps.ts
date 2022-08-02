// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IndexedCssProps } from '~/_/CssProps'
import type { PropsFromCssProps } from '~/Styled'

import type { IStyledDataMod } from './IStyledData'

export type GetModProps<Mod extends IStyledDataMod> =
	Mod['cssProps'] extends IndexedCssProps
		? PropsFromCssProps<Mod['cssProps']>
		: {}
