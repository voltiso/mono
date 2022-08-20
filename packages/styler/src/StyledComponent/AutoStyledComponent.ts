// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { IStylable, StylableLike } from '~'
import type { Props } from '~/react-types'

import type { IStyledComponent } from './IStyledComponent'
import type { StyledComponent_ } from './StyledComponent'

// export type StyledComponentCConstraint<P> = P extends Props
// 	? IStylable
// 	: P extends NotProvided
// 	? never
// 	: never

/** With Element already provided */
export type StyledComponent<
	P extends OptionalArgument<Props> = NotProvided,
	C extends StylableLike = IStylable,
	// C extends StyledComponentCConstraint<P> = StyledComponentCConstraint<P>,
> = P extends NotProvided
	? IStyledComponent
	: P extends Props
	? StyledComponent_<P, C>
	: never
