// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { IStylableJsxCall, StylableJsxCall_ } from './StylableJsxCall'

export type StylableJsxCall<
	P extends OptionalArgument<Props> | NotProvided = NotProvided,
> = P extends NotProvided
	? IStylableJsxCall
	: P extends Props
	? StylableJsxCall_<P>
	: never
