// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	CustomUnknownTuple,
	DefaultUnknownTupleOptions,
	ISchema,
	Schemable,
	UnknownTupleOptions,
} from '~'
import {
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isArray,
	isUnknownTuple,
	MutableTuple,
	OPTIONS,
	PARTIAL_OPTIONS,
	ReadonlyTuple,
	SCHEMA_NAME,
} from '~'
import * as s from '~'

export class CustomUnknownTupleImpl<O extends Partial<UnknownTupleOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownTuple<O>
{
	declare readonly [SCHEMA_NAME]: 'UnknownTuple';

	declare readonly [PARTIAL_OPTIONS]: O;
	declare readonly [DEFAULT_OPTIONS]: DefaultUnknownTupleOptions

	//

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].isReadonlyTuple as never
	}

	get getMinLength(): this[OPTIONS]['minLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].minLength as never
	}

	get getMaxLength(): this[OPTIONS]['maxLength'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].maxLength as never
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	[CALL]<T extends Schemable[]>(
		...elementSchemas: T
	): O['isReadonlyTuple'] extends true
		? s.ReadonlyTuple<T>
		: O['isReadonlyTuple'] extends false
		? s.MutableTuple<T>
		: never {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (this.isReadonlyTuple) return new ReadonlyTuple(elementSchemas) as never
		else return new MutableTuple(elementSchemas) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (isUnknownTuple(other) && this.isReadonlyTuple && !other.isReadonlyTuple)
			return false

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
