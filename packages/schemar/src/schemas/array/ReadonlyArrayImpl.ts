// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { Schemable } from '~'
import { defaultReadonlyArrayOptions } from '~'
import * as s from '~'

import { CustomArrayImpl } from './CustomArrayImpl'

//

export class ReadonlyArrayImpl<
	Element extends Schemable,
> extends lazyConstructor(() => CustomArrayImpl)<never> {
	constructor(element: Element) {
		super({
			...defaultReadonlyArrayOptions,
			element: s.schema(element),
		} as never)
	}
}
