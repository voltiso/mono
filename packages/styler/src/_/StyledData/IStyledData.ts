// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps/IndexedCssProps'
import type { Props } from '~/react-types'
import type { StylableLike } from '~/Stylable'
import type { IStack } from '~/Styled/_/Stack'

export interface IStyledData {
	element: StylableLike | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps
}

export type IStyledDataMod = Partial<{
	element: StylableLike | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps | IndexedCssPropsSingle
}>
