// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, lazyConstructor, OPTIONS } from '@voltiso/util'

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { ISchema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'
import type { Schemable } from '~/types/Schemable/Schemable'

import type { CustomIntersection } from '../CustomIntersection'
import type { IIntersection } from '../IIntersection'
import type { IntersectionOptions } from '../IntersectionOptions'

$assert(SCHEMA_NAME)
$assert(EXTENDS)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomIntersectionImpl<O> {
	readonly [BASE_OPTIONS]: IntersectionOptions
	readonly [DEFAULT_OPTIONS]: IntersectionOptions.Default
}

export class CustomIntersectionImpl<O extends Partial<IntersectionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomIntersection<O>, IIntersection
{
	readonly [SCHEMA_NAME] = 'Intersection' as const

	get getSchemas(): this[OPTIONS]['schemas'] {
		return this[OPTIONS].schemas as never
	}

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: ISchema): boolean {
		throw new Error('Method not implemented.') // TODO
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		let issues: ValidationIssue[] = []

		for (const t of this.getSchemas as Schemable[]) {
			const r = schema(t).exec(x, options)
			issues = [...issues, ...r.issues]
		}

		return issues
	}
}
