// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { $$Schemable } from '~/types/Schemable/Schemable'

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
