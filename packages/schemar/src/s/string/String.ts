// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from '@voltiso/util'

import type * as s from '..'
import type { DefaultStringOptions } from './_/StringOptions.js'
import type { CustomString } from './CustomString.js'
import { String_ } from './String_.js'

export interface String extends CustomString<DefaultStringOptions> {
	<L extends string>(...literals: L[]): s.Literal<L>
	<L extends string>(literals: Set<L>): s.Literal<L>
	<L extends string>(...args: L[] | [Set<L>]): s.Literal<L>
}

type StringConstructor = new () => String

export const String = String_ as unknown as StringConstructor
// eslint-disable-next-line no-new-wrappers
export const string: String = lazyValue(() => new String())
