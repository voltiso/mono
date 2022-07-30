// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { Schemable } from '~'
import { defaultMutableArrayOptions } from '~'
import * as s from '~'

import { CustomArrayImpl } from './CustomArrayImpl'

export class MutableArrayImpl<
	Element extends Schemable,
> extends lazyConstructor(() => CustomArrayImpl)<never> {
	constructor(element: Element) {
		super({
			...defaultMutableArrayOptions,
			element: s.schema(element),
		} as never)
	}
}
