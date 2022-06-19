import { CALL, callableInstance, lazyConstructor } from '@voltiso/ts-util/class'
import { ISchema, Schema_, OPTIONS, RootSchemable } from '../../../schema'
import { isArray } from '../../array'
import {
	defaultMutableUnknownTupleOptions,
	DefaultMutableUnknownTupleOptions,
	defaultReadonlyUnknownTupleOptions,
	DefaultReadonlyUnknownTupleOptions,
	UnknownTupleOptions,
} from './_/UnknownTupleOptions'
import { CustomUnknownTuple } from './CustomUnknownTuple'
import { isUnknownTuple, IS_UNKNOWN_TUPLE } from './IUnknownTuple'
import { OmitCall } from '@voltiso/ts-util/object'
import { ReadonlyTuple, MutableTuple } from '../Tuple'
import { EXTENDS } from '../../../schema/_/symbols'
import * as s from '../..'

export class UnknownTuple_<O extends UnknownTupleOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements OmitCall<CustomUnknownTuple<O>>
{
	readonly [IS_UNKNOWN_TUPLE] = true as const

	get isReadonlyTuple() {
		return this[OPTIONS].readonlyTuple
	}

	get getMinLength() {
		return this[OPTIONS].minLength
	}

	get getMaxLength() {
		return this[OPTIONS].maxLength
	}

	constructor(o: O) {
		super(o)
		return callableInstance(this) as never
	}

	[CALL]<T extends RootSchemable[]>(
		...elementSchemas: T
	): O['readonlyTuple'] extends true
		? s.ReadonlyTuple<T>
		: O['readonlyTuple'] extends false
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
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!Array.isArray(x))
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be [...]',
					received: x,
				})
			)

		return issues
	}

	override _toString(): string {
		return ' [...]'
	}

	get readonlyTuple(): never {
		return this._cloneWithOptions({ readonlyTuple: true }) as never
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
		maxLength: Max
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
