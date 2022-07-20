// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { Props as Properties } from '../react-types'
import type { IStyledComponent } from './IStyledComponent.js'
import type { StyledComponent_ } from './StyledComponent.js'

/** With Element already provided */
export type StyledComponent<
	P extends OptionalArgument<Properties> = NotProvided,
> = P extends NotProvided
	? IStyledComponent
	: P extends Properties
	? StyledComponent_<P>
	: never
