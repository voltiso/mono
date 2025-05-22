// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UNSET, OptionalArgument } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { IStylable } from './IStylable'
import type { StylableWithProps } from './Stylable'

/** Element types that can be styled using style(...), and require P as props */
export type Stylable<P extends OptionalArgument<Props> = UNSET> =
	P extends UNSET ? IStylable : P extends Props ? StylableWithProps<P> : never
