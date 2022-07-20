// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-classes-per-file */

import type { OmitCall } from '@voltiso/util'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type { ISchema, RootSchemable } from '../../../schema'
import { OPTIONS, Schema_ } from '../../../schema'
import { EXTENDS } from '../../../schema/_/symbols.js'
import * as s from '../..'
import { isArray } from '../../array'
import { MutableTuple, ReadonlyTuple } from '../Tuple.js'
import type {
	DefaultMutableUnknownTupleOptions,
	DefaultReadonlyUnknownTupleOptions,
	UnknownTupleOptions,
} from './_/UnknownTupleOptions.js'
import {
	defaultMutableUnknownTupleOptions,
	defaultReadonlyUnknownTupleOptions,
} from './_/UnknownTupleOptions.js'
import type { CustomUnknownTuple } from './CustomUnknownTuple.js'
import { IS_UNKNOWN_TUPLE, isUnknownTuple } from './IUnknownTuple.js'

export class UnknownTuple_<O extends UnknownTupleOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements OmitCall<CustomUnknownTuple<O>>
{
	readonly [IS_UNKNOWN_TUPLE] = true as const

	get isReadonlyTuple() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonlyTuple
	}

	get getMinLength() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].minLength
	}

	get getMaxLength() {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].maxLength
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	[CALL]<T extends RootSchemable[]>(
		...elementSchemas: T
	): O['isReadonlyTuple'] extends true
		? s.ReadonlyTuple<T>
		: O['isReadonlyTuple'] extends false
		? s.MutableTuple<T>
		: never {
		if (this.isReadonlyTuple) return new ReadonlyTuple(elementSchemas) as never
		else return new MutableTuple(elementSchemas) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownTuple(other) && this.isReadonlyTuple && !other.isReadonlyTuple)
			return false

		if (isArray(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		if (isUnknownTuple(other)) return true
		else if (isArray(other)) return s.unknown.extends(other.getElementSchema)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!Array.isArray(x))
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be [...]',
					received: x,
				}),
			)

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return ' [...]'
	}

	get readonlyTuple(): never {
		return this._cloneWithOptions({ isReadonlyTuple: true }) as never
	}

	minLength<Min extends number>(minLength: Min): never {
		return this._cloneWithOptions({ minLength }) as never
	}

	maxLength<Max extends number>(maxLength: Max): never {
		return this._cloneWithOptions({ maxLength }) as never
	}

	length<Length extends number>(exactLength: Length): never {
		return this._cloneWithOptions({
			minLength: exactLength,
			maxLength: exactLength,
		}) as never
	}

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): never {
		return this._cloneWithOptions({ minLength, maxLength }) as never
	}
}

//

export class MutableUnknownTuple_ extends UnknownTuple_<DefaultMutableUnknownTupleOptions> {
	constructor() {
		super(defaultMutableUnknownTupleOptions)
	}
}

export class ReadonlyUnknownTuple_ extends UnknownTuple_<DefaultReadonlyUnknownTupleOptions> {
	constructor() {
		super(defaultReadonlyUnknownTupleOptions)
	}
}
