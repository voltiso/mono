// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OptionalArgument, UNSET } from '@voltiso/util'

import type { Props } from '~/react-types'

import type {
	IStylableJsxConstruct,
	StylableJsxConstruct_,
} from './StylableJsxConstruct'

export type StylableJsxConstruct<
	P extends OptionalArgument<Props> | UNSET = UNSET,
> = P extends UNSET
	? IStylableJsxConstruct
	: P extends Props
		? StylableJsxConstruct_<P>
		: never
