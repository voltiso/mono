// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StylableLike } from '~/Stylable'

import type { CustomStyledComponent } from './CustomStyledComponent'
import type { NativeElement } from './GetStyledComponent'

/** With Element already provided */
export interface StyledComponent<C extends StylableLike | NativeElement>
	extends CustomStyledComponent<C, { Props: {}; CustomCss: {} }> {}
