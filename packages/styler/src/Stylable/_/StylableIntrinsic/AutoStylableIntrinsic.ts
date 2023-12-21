// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument, OptionalArgument } from '@voltiso/util'

import type { Props } from '~/react-types'

import type {
	IStylableIntrinsicElement,
	StylableIntrinsicElement_,
} from './StylableIntrinsic'

export type StylableIntrinsic<
	P extends OptionalArgument<Props> | NoArgument = NoArgument,
> = P extends NoArgument
	? IStylableIntrinsicElement
	: P extends Props
		? StylableIntrinsicElement_<P>
		: never
