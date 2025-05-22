// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { $$Schemable, Schema } from '~'

import type { $$Intersection } from './CustomIntersection'
import type { IntersectionOptions } from './IntersectionOptions'

export interface IIntersection extends $$Intersection, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Intersection'

	readonly [Voltiso.BASE_OPTIONS]: IntersectionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: IntersectionOptions.Default

	get getSchemas(): $$Schemable[]
}

export function isIntersectionSchema(x: unknown): x is IIntersection {
	return (x as IIntersection | null)?.[SCHEMA_NAME] === 'Intersection'
}
