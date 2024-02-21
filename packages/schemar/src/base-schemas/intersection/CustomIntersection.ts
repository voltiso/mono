// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { IntersectionOptions } from './IntersectionOptions'

export interface $$Intersection {
	readonly [SCHEMA_NAME]: 'Intersection'
}

export interface CustomIntersection<O extends Partial<IntersectionOptions>>
	extends $$Intersection,
		CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Intersection'

	readonly [BASE_OPTIONS]: IntersectionOptions
	readonly [DEFAULT_OPTIONS]: IntersectionOptions.Default

	//

	get getSchemas(): this[OPTIONS]['schemas']
}

export interface CustomIntersection$<O extends Partial<IntersectionOptions>>
	extends $$Intersection,
		CustomSchema$<O> {
	readonly [SCHEMA_NAME]: 'Intersection'

	readonly [BASE_OPTIONS]: IntersectionOptions
	readonly [DEFAULT_OPTIONS]: IntersectionOptions.Default

	//

	get getSchemas(): this[OPTIONS]['schemas']
}
