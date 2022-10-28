// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { schema } from '../unknownSchema'
import { CustomArrayImpl } from './CustomArrayImpl'
import { defaultMutableArrayOptions } from './defaultArrayOptions'

export class MutableArrayImpl<
	Element extends $$Schemable,
> extends lazyConstructor(() => CustomArrayImpl)<never> {
	constructor(element: Element) {
		super({
			...defaultMutableArrayOptions,
			element: schema(element),
		} as never)
	}
}
