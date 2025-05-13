// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument, OptionalArgument } from '@voltiso/util'

import type { Props } from '~/react-types'

import type {
	IStylableJsxConstruct,
	StylableJsxConstruct_,
} from './StylableJsxConstruct'

export type StylableJsxConstruct<
	P extends OptionalArgument<Props> | NoArgument = NoArgument,
> = P extends NoArgument
	? IStylableJsxConstruct
	: P extends Props
		? StylableJsxConstruct_<P>
		: never
