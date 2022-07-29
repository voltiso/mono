// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	CustomUnion,
	DefaultUnionOptions,
	IUnion,
	Schema,
	UnionOptions,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isUnion,
	OPTIONS,
	schema,
	SCHEMA_NAME,
	ValidationIssue,
} from '~'

export class CustomUnionImpl<O extends Partial<UnionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnion<O>, IUnion
{
	declare readonly [SCHEMA_NAME]: 'Union';
	declare readonly [BASE_OPTIONS]: UnionOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultUnionOptions

	get getSchemas(): this[OPTIONS]['schemas'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].schemas as never
	}

	override [EXTENDS](other: Schema): boolean {
		const otherTypes = isUnion(other) ? other.getSchemas : [other]

		for (const a of this.getSchemas) {
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

		for (const t of this.getSchemas) {
			const r = schema(t).tryValidate(x)

			if (r.isValid) valid = true
			else moreIssues = [...moreIssues, ...r.issues]
		}

		if (!valid) {
			issues.push(
				new ValidationIssue({
					expectedOneOf: this.getSchemas.map(t => schema(t)),
					received: x,
				}),
			)
			issues = [...issues, ...moreIssues]
		}

		return issues
	}
}
