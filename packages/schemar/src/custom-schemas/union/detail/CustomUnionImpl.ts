// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '_'
import { EXTENDS, OPTIONS, SCHEMA_NAME } from '_'
import { lazyConstructor } from '@voltiso/util'

import type {
	CustomUnion,
	DefaultUnionOptions,
	IUnion,
	UnionOptions,
} from '~/custom-schemas'
import { schema, ValidationIssue } from '~/custom-schemas'
import { isUnion } from '~/custom-schemas'
import type { ISchema } from '~/Schema'
import { CustomSchemaImpl } from '~/Schema'
import type { Schemable, Schemable_ } from '~/Schemable'

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
		const otherTypes: Schemable_[] = isUnion(other) ? other.getSchemas : [other]

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

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		let issues = super._getIssuesImpl(x)

		let valid = false
		let moreIssues = [] as ValidationIssue[]

		for (const t of this.getSchemas as Schemable[]) {
			const r = schema(t).tryValidate(x)

			if (r.isValid) valid = true
			else moreIssues = [...moreIssues, ...r.issues]
		}

		if (!valid) {
			issues.push(
				new ValidationIssue({
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
