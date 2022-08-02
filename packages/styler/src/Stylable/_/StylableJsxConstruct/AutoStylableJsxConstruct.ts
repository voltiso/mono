// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { Props } from '~/react-types'

import type {
	IStylableJsxConstruct,
	StylableJsxConstruct_,
} from './StylableJsxConstruct'

export type StylableJsxConstruct<
	P extends OptionalArgument<Props> | NotProvided = NotProvided,
> = P extends NotProvided
	? IStylableJsxConstruct
	: P extends Props
	? StylableJsxConstruct_<P>
	: never
