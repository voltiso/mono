// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

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
