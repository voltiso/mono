// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IStyledDataWithTypeInfo } from '~/_/StyledData'
import type { IStylable } from '~/Stylable'

export abstract class IStyled {
	protected abstract _data: IStyledDataWithTypeInfo
	abstract get component(): IStylable | null
}
