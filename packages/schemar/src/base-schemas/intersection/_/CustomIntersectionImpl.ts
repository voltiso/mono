// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, lazyConstructor, OPTIONS } from '@voltiso/util'

import type {
	CustomIntersection,
	DefaultIntersectionOptions,
	IIntersection,
	IntersectionOptions,
	ISchema,
	Schemable,
	ValidateOptions,
} from '~'
import { CustomSchemaImpl } from '~'
import { schema } from '~/core-schemas'
import type { ValidationIssue } from '~/meta-schemas/validationIssue'

$assert(SCHEMA_NAME)
$assert(EXTENDS)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomIntersectionImpl<O> {
	readonly [BASE_OPTIONS]: IntersectionOptions
	readonly [DEFAULT_OPTIONS]: DefaultIntersectionOptions
}

export class CustomIntersectionImpl<O extends Partial<IntersectionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomIntersection<O>, IIntersection
{
	readonly [SCHEMA_NAME] = 'Intersection' as const

	get getSchemas(): this[OPTIONS]['schemas'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].schemas as never
	}

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: ISchema): boolean {
		throw new Error('Method not implemented.') // TODO
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationIssue[] {
		let issues: ValidationIssue[] = []

		for (const t of this.getSchemas as Schemable[]) {
			const r = schema(t).exec(x, options)
			issues = [...issues, ...r.issues]
		}

		return issues
	}
}
