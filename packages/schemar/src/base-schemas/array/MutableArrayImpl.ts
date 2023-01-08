// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { $$Schemable } from '~'
import { schema } from '~/core-schemas'

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
