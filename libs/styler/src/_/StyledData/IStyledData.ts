// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	IndexedCssProps,
	IndexedCssPropsSingle,
} from '~/_/CssProps/IndexedCssProps'
import type { Props } from '~/react-types'
import type { Stylable, StylableLike, StylableRenderFunction } from '~/Stylable'
import type { IStack } from '~/Styled/_/Stack'
import type { NativeElement } from '~/StyledComponent'

export type Unit =
	| 'px'
	| 'rem'
	| 'em'
	| 'cm'
	| 'mm'
	| 'pc'
	| 'pt'
	| 'in'
	| '%'
	| 'vw'
	| 'vh'
	| 'vmin'
	| 'vmax'
	| 'ch'
	| 'ex'

export interface IStyledData<CustomCss extends object> {
	component: StylableLike | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps<CustomCss>
	// customCss: IndexedCssProps

	/** @defaultValue 'px' */
	unit: Unit
}

export type IStyledDataMod<CustomCss extends object> = Partial<{
	component: Stylable | StylableRenderFunction<NativeElement, CustomCss> | null

	stack: IStack

	defaults: Partial<Props>
	domDefaults: Partial<Props>

	cssProps: IndexedCssProps<CustomCss> | IndexedCssPropsSingle<CustomCss>
	customCss: IndexedCssProps<CustomCss> | IndexedCssPropsSingle<CustomCss>

	unit: Unit
}>
