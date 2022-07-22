// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../schema'
import { Schema_ } from '../../schema'
import { EXTENDS } from '../../schema/_/symbols.js'
import * as s from '..'
import { isLiteral, isUnknownLiteral } from '../literal'
import { isUnion } from '../union'
import type {
	BooleanOptions,
	DefaultBooleanOptions,
} from './_/BooleanOptions.js'
import { defaultBooleanOptions } from './_/BooleanOptions.js'
import { collectTrueFalse } from './_/collectTrueFalse.js'
import type { CustomBoolean } from './CustomBoolean.js'
import { IS_BOOLEAN, isBoolean } from './IBoolean.js'

class Boolean__<O extends BooleanOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomBoolean<O>
{
	readonly [IS_BOOLEAN] = true as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	[CALL]<L extends boolean>(...literals: L[]): s.Literal<L>
	[CALL]<L extends boolean>(literals: Set<L>): s.Literal<L>
	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): s.Literal<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends boolean>(...args: L[] | [Set<L>]): s.Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return s.literal(literals)
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isBoolean(other)) return true
		else if (isUnknownLiteral(other)) return true
		else if (isLiteral(other) || isUnion(other)) {
			const { haveTrue, haveFalse } = collectTrueFalse(other)
			return haveTrue && haveFalse
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'boolean')
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'boolean',
					received: x,
				}),
			)

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'boolean'
	}
}

export class Boolean_ extends Boolean__<DefaultBooleanOptions> {
	constructor() {
		super(defaultBooleanOptions as never)
	}
}
