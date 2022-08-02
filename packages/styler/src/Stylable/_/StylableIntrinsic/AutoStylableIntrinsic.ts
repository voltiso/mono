// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { Props } from '~/react-types'

import type {
	IStylableIntrinsic,
	StylableIntrinsic_,
} from './StylableIntrinsic'

export type StylableIntrinsic<
	P extends OptionalArgument<Props> | NotProvided = NotProvided,
> = P extends NotProvided
	? IStylableIntrinsic
	: P extends Props
	? StylableIntrinsic_<P>
	: never
