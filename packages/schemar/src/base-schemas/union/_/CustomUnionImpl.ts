// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import { $fastAssert, lazyConstructor, OPTIONS } from '@voltiso/util'

import { schema } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'
import type { $$Schemable, Schemable } from '~/types/Schemable/Schemable'

import type { CustomUnion } from '../CustomUnion'
import type { IUnion } from '../IUnion'
import { isUnionSchema } from '../IUnion'
import type { UnionOptions } from '../UnionOptions'

$fastAssert(OPTIONS)
$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnionImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnionOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnionImpl<O extends Partial<UnionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnion<O>, IUnion
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Union' as const

	get getSchemas(): this[Voltiso.OPTIONS]['schemas'] {
		return this[Voltiso.OPTIONS].schemas as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		const otherTypes: $$Schemable[] = isUnionSchema(other)
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
		options?: Partial<ValidationOptions> | undefined,
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
					name: this[Voltiso.OPTIONS].name,

					expected: {
						oneOfValues: (this.getSchemas as unknown as Schemable[]).map(t =>
							schema(t),
						),
					},

					received: { value: x },
				}),
			)
			issues = [...issues, ...moreIssues]
		}

		return issues
	}
}
