// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { StyledData } from '../_/StyledData'
import type { Props } from '../react-types'
import { Styled } from '../Styled/AutoStyled.js'
import type { IStyledHoc } from './IStyledHoc.js'
import type { StyledHoc_ } from './StyledHoc.js'

export type StyledHoc<P extends OptionalArgument<Props> = NotProvided> =
	P extends NotProvided ? IStyledHoc : P extends Props ? StyledHoc_<P> : never

export const StyledHoc = Styled as StyledHocConstructor

export type StyledHocConstructor = new <P extends Props>(
	data: StyledData<P, null>,
) => StyledHoc<P>
