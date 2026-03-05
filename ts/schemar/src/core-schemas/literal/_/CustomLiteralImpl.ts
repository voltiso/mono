// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	$fastAssert,
	isSubset,
	lazyConstructor,
	OPTIONS,
	stringFrom,
} from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

import { isUnknownLiteralSchema } from '~/core-schemas/unknownLiteral/isUnknownLiteral'
import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { InferableLiteral } from '~/types/Inferable/Inferable'
import type { Schema } from '~/types/Schema/ISchema'

import type { CustomLiteral } from '../CustomLiteral'
import { isLiteralSchema } from '../isLiteral'
import type { LiteralOptions } from '../LiteralOptions'
import { literalValueExtends } from './literalValueExtends'

$fastAssert(OPTIONS)
$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomLiteralImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: LiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: LiteralOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomLiteralImpl<O extends Partial<LiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomLiteral<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Literal' as const

	get getValues(): Set<never> {
		return this[Voltiso.OPTIONS].values as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
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
					name: this[Voltiso.OPTIONS].name,
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
