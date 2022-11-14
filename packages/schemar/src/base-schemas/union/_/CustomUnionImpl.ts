// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schemable,
	CustomUnion,
	DefaultUnionOptions,
	ISchema,
	IUnion,
	Schemable,
	UnionOptions,
	ValidateOptions,
} from '@voltiso/schemar.types'
import { EXTENDS, isUnion, SCHEMA_NAME } from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { lazyConstructor, OPTIONS } from '@voltiso/util'

import { schema } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnionImpl<O> {
	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnionOptions
}

export class CustomUnionImpl<O extends Partial<UnionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnion<O>, IUnion
{
	readonly [SCHEMA_NAME] = 'Union' as const

	get getSchemas(): this[OPTIONS]['schemas'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].schemas as never
	}

	override [EXTENDS](other: ISchema): boolean {
		const otherTypes: $$Schemable[] = isUnion(other)
			? other.getSchemas
			: [other]

		for (const a of this.getSchemas as Schemable[]) {
			let good = false

			for (const b of otherTypes) {
				if (schema(a).extends(b)) {
					good = true
					break
				}
			}

			if (!good) return false
		}

		return true
	}

	override _getIssues(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationIssue[] {
		let issues: ValidationIssue[] = []

		let valid = false
		let moreIssues = [] as ValidationIssue[]

		for (const t of this.getSchemas as Schemable[]) {
			const r = schema(t).exec(x, options)

			if (r.isValid) valid = true
			else moreIssues = [...moreIssues, ...r.issues]
		}

		if (!valid) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,

					expectedOneOf: (this.getSchemas as unknown as Schemable[]).map(t =>
						schema(t),
					),

					received: x,
				}),
			)
			issues = [...issues, ...moreIssues]
		}

		return issues
	}
}
