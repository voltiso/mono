// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OptionalArgument, UNSET } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { IStylableJsxCall, StylableJsxCall_ } from './StylableJsxCall'

export type StylableJsxCall<P extends OptionalArgument<Props> | UNSET = UNSET> =
	P extends UNSET
		? IStylableJsxCall
		: P extends Props
			? StylableJsxCall_<P>
			: never
