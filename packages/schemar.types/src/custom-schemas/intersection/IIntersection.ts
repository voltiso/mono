// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { ISchema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

import type { $$Intersection } from './CustomIntersection'
import type {
	DefaultIntersectionOptions,
	IntersectionOptions,
} from './IntersectionOptions'

export interface IIntersection extends $$Intersection, ISchema {
	readonly [SCHEMA_NAME]: 'Intersection'

	readonly [BASE_OPTIONS]: IntersectionOptions
	readonly [DEFAULT_OPTIONS]: DefaultIntersectionOptions

	get getSchemas(): $$Schemable[]
}

export function isIntersection(x: unknown): x is IIntersection {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IIntersection | null)?.[SCHEMA_NAME] === 'Intersection'
}
