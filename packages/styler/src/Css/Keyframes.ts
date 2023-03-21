// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssWeb } from '~/Css-declaration-merging'

import type { CustomCss } from './Css'

export interface Keyframes {
	from?: CssWeb<CustomCss> | undefined
	to?: CssWeb<CustomCss> | undefined
	'0%'?: CssWeb<CustomCss> | undefined
	'25%'?: CssWeb<CustomCss> | undefined
	'33%'?: CssWeb<CustomCss> | undefined
	'50%'?: CssWeb<CustomCss> | undefined
	'67%'?: CssWeb<CustomCss> | undefined
	'75%'?: CssWeb<CustomCss> | undefined
	'100%'?: CssWeb<CustomCss> | undefined
	[k: string]: CssWeb<CustomCss> | undefined
}
