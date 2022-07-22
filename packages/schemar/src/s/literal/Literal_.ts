// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Simple } from '@voltiso/util'
import { isSet, isSubset, lazyConstructor, toString } from '@voltiso/util'

import type { ISchema } from '../..'
import type { InferableLiteral } from '../../schema'
import { OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import * as s from '..'
import type {
	DefaultLiteralOptions,
	LiteralOptions,
} from './_/LiteralOptions.js'
import { defaultLiteralOptions } from './_/LiteralOptions.js'
import { literalValueExtends } from './_/literalValueExtends.js'
import type { CustomLiteral } from './CustomLiteral.js'
import { IS_LITERAL, isLiteral } from './ILiteral.js'
import { isUnknownLiteral } from './unknown'

class Literal__<O extends LiteralOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomLiteral<O>
{
	readonly [IS_LITERAL] = true

	get getValues(): this[OPTIONS]['values'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].values
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [EXTENDS](other: ISchema): boolean {
		if (isLiteral(other)) return isSubset(this.getValues, other.getValues)
		else if (isUnknownLiteral(other)) return true

		let good = true

		for (const l of this.getValues) {
			// const isStillGood = getBaseSchema(l)[EXTENDS](other)
			const isStillGood = literalValueExtends(l, other)

			if (!isStillGood) {
				good = false
				break
			}
		}

		return good
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!this.getValues.has(x as InferableLiteral)) {
			issues.push(
				new s.ValidationIssue({
					expectedOneOf: this.getValues,
					received: x,
				}),
			)
		}

		return issues
	}

	override _toString(): string {
		return [...this.getValues].map(x => toString(x)).join(' | ')
	}
}

export class Literal_<L extends InferableLiteral> extends Literal__<
	Merge2Simple<DefaultLiteralOptions, { values: Set<L>; _out: L; _in: L }>
> {
	constructor(...args: [Set<L>] | L[]) {
		const values = isSet(args[0]) ? args[0] : new Set(args as L[])
		super({ ...defaultLiteralOptions, values } as never)
	}
}
