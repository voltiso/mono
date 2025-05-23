// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import { $fastAssert, lazyConstructor, OPTIONS } from '@voltiso/util'

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'
import type { Schemable } from '~/types/Schemable/Schemable'

import type { CustomIntersection } from '../CustomIntersection'
import type { IIntersection } from '../IIntersection'
import type { IntersectionOptions } from '../IntersectionOptions'

$fastAssert(SCHEMA_NAME)
$fastAssert(EXTENDS)
$fastAssert(OPTIONS)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomIntersectionImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: IntersectionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: IntersectionOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomIntersectionImpl<O extends Partial<IntersectionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomIntersection<O>, IIntersection
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Intersection' as const

	get getSchemas(): this[Voltiso.OPTIONS]['schemas'] {
		return this[Voltiso.OPTIONS].schemas as never
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override [Voltiso.Schemar.EXTENDS](_other: Schema): boolean {
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
