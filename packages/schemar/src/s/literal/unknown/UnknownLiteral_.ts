// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { ISchema } from '../../..'
import type { InferableLiteral } from '../../../schema'
import { Schema_ } from '../../../schema'
import { EXTENDS } from '../../../schema/_/symbols.js'
import type * as s from '../..'
import { Literal_ } from '../Literal_.js'
import type {
	DefaultUnknownLiteralOptions,
	UnknownLiteralOptions,
} from './_/UnknownLiteralOptions.js'
import { defaultUnknownLiteralOptions } from './_/UnknownLiteralOptions.js'
import type { CustomUnknownLiteral } from './CustomUnknownLiteral.js'
import { IS_UNKNOWN_LITERAL, isUnknownLiteral } from './IUnknownLiteral.js'

class UnknownLiteral__<O extends UnknownLiteralOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomUnknownLiteral<O>
{
	readonly [IS_UNKNOWN_LITERAL] = true

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownLiteral(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		return super._getIssuesImpl(x)
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'literal'
	}

	[CALL]<L extends InferableLiteral>(...literals: L[]): Literal_<L>
	[CALL]<L extends InferableLiteral>(literals: Set<L>): Literal_<L>
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal_<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal_<L> {
		return new Literal_(...args)
	}
}

//

export class UnknownLiteral_ extends UnknownLiteral__<DefaultUnknownLiteralOptions> {
	constructor() {
		super(defaultUnknownLiteralOptions)
	}
}
