// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'

import type { IntersectionOptions } from './IntersectionOptions'

export interface $$Intersection {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Intersection'
}

export interface CustomIntersection<O extends Partial<IntersectionOptions>>
	extends $$Intersection,
		CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Intersection'

	readonly [Voltiso.BASE_OPTIONS]: IntersectionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: IntersectionOptions.Default

	//

	get getSchemas(): this[Voltiso.OPTIONS]['schemas']
}

export interface CustomIntersection$<O extends Partial<IntersectionOptions>>
	extends $$Intersection,
		CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Intersection'

	readonly [Voltiso.BASE_OPTIONS]: IntersectionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: IntersectionOptions.Default

	//

	get getSchemas(): this[Voltiso.OPTIONS]['schemas']
}
