// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { $$Schemable } from '~'
import { schema } from '~/core-schemas'

import { CustomArrayImpl } from './CustomArrayImpl'
import { defaultReadonlyArrayOptions } from './defaultArrayOptions'

//

export class ReadonlyArrayImpl<
	Element extends $$Schemable,
> extends lazyConstructor(() => CustomArrayImpl)<never> {
	constructor(element: Element) {
		super({
			...defaultReadonlyArrayOptions,
			element: schema(element),
		} as never)
	}
}
