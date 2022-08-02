// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Props } from '~/react-types'
import type { IStylable } from '~/Stylable'

import type { StyledData } from './StyledData'

export interface StyledDataWithTypeInfo<
	P extends Props,
	C extends IStylable | null,
> extends StyledData<P, C> {
	/** Type-only (no value at runtime) */
	P: P
}
