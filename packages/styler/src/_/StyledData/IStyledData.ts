// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps/IndexedCssProps'
import type { Props } from '~/react-types'
import type { Stylable, StylableLike } from '~/Stylable'
import type { IStack } from '~/Styled/_/Stack'

export interface IStyledData {
	component: StylableLike | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps
	// customCss: IndexedCssProps
}

export type IStyledDataMod = Partial<{
	component: Stylable | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps | IndexedCssPropsSingle
	customCss: IndexedCssProps | IndexedCssPropsSingle
}>
