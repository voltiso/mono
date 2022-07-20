// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Styled } from './AutoStyled.js'
import type { IStyled } from './IStyled.js'

export function isStyled(e: unknown): e is IStyled {
	return e instanceof Styled // TODO: don't use instanceof
}
