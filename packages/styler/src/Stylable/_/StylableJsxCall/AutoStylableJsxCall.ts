// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument, OptionalArgument } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { IStylableJsxCall, StylableJsxCall_ } from './StylableJsxCall'

export type StylableJsxCall<
	P extends OptionalArgument<Props> | NoArgument = NoArgument,
> = P extends NoArgument
	? IStylableJsxCall
	: P extends Props
		? StylableJsxCall_<P>
		: never
