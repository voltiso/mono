// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'
import type * as React from 'react'

import type { Css } from './Css'

export function defineCss<TCss extends Css>(
	css: TCss,
): { -readonly [k in keyof TCss]: TCss[k] } {
	return css as never
}

//

export type CssSelectors = Partial<
	Record<keyof React.JSX.IntrinsicElements | AlsoAccept<string>, Css>
>

export function defineCssSelectors<T extends CssSelectors>(
	selectors: T,
): { -readonly [k in keyof T]: T[k] } {
	return selectors
}
