// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PropsFromCssProps } from '../../Styled'
import type { IndexedCssProps } from '../CssProps'
import type { IStyledDataMod } from './IStyledData.js'

export type GetModProps<Mod extends IStyledDataMod> =
	Mod['cssProps'] extends IndexedCssProps
		? PropsFromCssProps<Mod['cssProps']>
		: {}
