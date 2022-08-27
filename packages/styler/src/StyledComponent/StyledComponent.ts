// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StylableLike } from '~/Stylable'

import type { CustomStyledComponent } from '.'

/** With Element already provided */
export interface StyledComponent<C extends StylableLike>
	extends CustomStyledComponent<C, { Props: {}; CustomCss: {} }> {}
