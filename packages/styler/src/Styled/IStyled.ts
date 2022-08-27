// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { STYLED_TYPE_INFO as $, StyledData, StyledTypeInfo } from '~'
import { STYLED_DATA } from '~'

export interface IStyled {
	readonly [$]: StyledTypeInfo
	readonly [STYLED_DATA]: StyledData
}

export function isStyled(x: unknown): x is IStyled {
	// eslint-disable-next-line security/detect-object-injection
	return typeof (x as IStyled | null)?.[STYLED_DATA] !== 'undefined'
}
