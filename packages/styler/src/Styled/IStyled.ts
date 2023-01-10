// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StyledData } from '~/_/StyledData'
import type { STYLED_TYPE_INFO } from '~/_/symbols'
import { STYLED_DATA } from '~/_/symbols'
import type { StyledTypeInfo } from '~/StyledTypeInfo'

export interface IStyled {
	readonly [STYLED_TYPE_INFO]: StyledTypeInfo
	readonly [STYLED_DATA]: StyledData
}

export function isStyled(x: unknown): x is IStyled {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IStyled | null)?.[STYLED_DATA] !== undefined
}
