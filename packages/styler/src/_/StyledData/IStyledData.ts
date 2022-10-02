// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NativeElement } from '~'
import type {
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps/IndexedCssProps'
import type { Props } from '~/react-types'
import type { Stylable, StylableLike, StylableRenderFunction } from '~/Stylable'
import type { IStack } from '~/Styled/_/Stack'

export interface IStyledData<CustomCss extends object> {
	component: StylableLike | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps<CustomCss>
	// customCss: IndexedCssProps
}

export type IStyledDataMod<CustomCss extends object> = Partial<{
	component: Stylable | StylableRenderFunction<NativeElement, CustomCss> | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps<CustomCss> | IndexedCssPropsSingle<CustomCss>
	customCss: IndexedCssProps<CustomCss> | IndexedCssPropsSingle<CustomCss>
}>
