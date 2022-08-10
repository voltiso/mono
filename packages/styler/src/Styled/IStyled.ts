// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Styled, STYLED_TYPE_INFO, StyledTypeInfo } from '~'
import { STYLED_DATA } from '~'

export interface IStyled {
	readonly [STYLED_TYPE_INFO]: StyledTypeInfo
	// readonly [STYLED_DATA]: IStyledData
}

export function isStyled(x: unknown): x is Styled {
	// eslint-disable-next-line security/detect-object-injection
	return typeof (x as Styled<{}, null> | null)?.[STYLED_DATA] !== 'undefined'
}
