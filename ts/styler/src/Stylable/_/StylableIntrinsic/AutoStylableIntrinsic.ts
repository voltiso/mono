// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OptionalArgument, UNSET } from '@voltiso/util'

import type { Props } from '~/react-types'

import type {
	IStylableIntrinsicElement,
	StylableIntrinsicElement_,
} from './StylableIntrinsic'

export type StylableIntrinsic<
	P extends OptionalArgument<Props> | UNSET = UNSET,
> = P extends UNSET
	? IStylableIntrinsicElement
	: P extends Props
		? StylableIntrinsicElement_<P>
		: never
