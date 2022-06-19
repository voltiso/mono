/* eslint-disable @typescript-eslint/no-unsafe-call */
import { lazyConstructor } from '@voltiso/ts-util/class'
import { Merge2Simple } from '@voltiso/ts-util/object'
import { isSet, isSubset } from '@voltiso/ts-util/set'
import { toString } from '@voltiso/ts-util/string'
import { ISchema } from '../..'
import { InferableLiteral, OPTIONS, Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols'
import { CustomLiteral } from './CustomLiteral'
import { isLiteral, IS_LITERAL } from './ILiteral'
import { isUnknownLiteral } from './unknown'
import { getBaseSchema } from './_/getBaseSchema'
import {
	DefaultLiteralOptions,
	defaultLiteralOptions,
	LiteralOptions,
} from './_/LiteralOptions'
import * as s from '..'

class Literal__<O extends LiteralOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomLiteral<O>
{
	readonly [IS_LITERAL] = true

	get getValues(): this[OPTIONS]['values'] {
		return this[OPTIONS].values
	}

	constructor(o: O) {
		super(o)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isLiteral(other)) return isSubset(this.getValues, other.getValues)
		else if (isUnknownLiteral(other)) return true

		let good = true
		for (const l of this.getValues) {
			const isStillGood = getBaseSchema(l)[EXTENDS](other)

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
				})
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
