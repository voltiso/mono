// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { isSubset, lazyConstructor, OPTIONS, stringFrom } from '@voltiso/util'

import type {
	CustomLiteral,
	InferableLiteral,
	ISchema,
	LiteralOptions,
} from '~'
import { CustomSchemaImpl, isLiteralSchema, isUnknownLiteralSchema } from '~'
import { ValidationIssue } from '~/meta-schemas'

import { literalValueExtends } from './literalValueExtends'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomLiteralImpl<O> {
	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: LiteralOptions.Default
}

export class CustomLiteralImpl<O extends Partial<LiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomLiteral<O>
{
	readonly [SCHEMA_NAME] = 'Literal' as const

	get getValues(): Set<never> {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].values as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isLiteralSchema(other))
			return isSubset(this.getValues, other.getValues as never)
		else if (isUnknownLiteralSchema(other)) return true

		let good = true

		for (const l of this.getValues as unknown as InferableLiteral[]) {
			// const isStillGood = getBaseSchema(l)[EXTENDS](other)
			const isStillGood = literalValueExtends(l, other)

			if (!isStillGood) {
				good = false
				break
			}
		}

		return good
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues = []

		if (!(this.getValues as Set<InferableLiteral>).has(x as InferableLiteral)) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { oneOfValues: [...this.getValues] },
					received: { value: x },
				}),
			)
		}

		return issues
	}

	override _toString(): string {
		return [...(this.getValues as unknown as InferableLiteral[])]
			.map(x => stringFrom(x))
			.join(' | ')
	}
}
