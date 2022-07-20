// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { Props } from '../react-types'
import type { IStylable } from '../Stylable'
import type { IStyled } from './IStyled.js'
import { Styled_ } from './Styled.js'

export type Styled<
	P extends OptionalArgument<Props> = NotProvided,
	C extends OptionalArgument<IStylable | null> = NotProvided,
> = P extends NotProvided
	? C extends NotProvided
		? IStyled
		: never
	: P extends Props
	? C extends IStylable | null
		? Styled_<P, C>
		: never
	: never

export const Styled = Styled_
