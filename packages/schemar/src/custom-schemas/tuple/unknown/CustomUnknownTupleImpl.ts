// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type DEFAULT_OPTIONS,
	type PARTIAL_OPTIONS,
	EXTENDS,
	OPTIONS,
	SCHEMA_NAME,
} from '_'
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
	isArray,
	isUnknownTuple,
	MutableTuple,
	ReadonlyTuple,
	unknown,
	ValidationIssue,
} from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownTupleImpl<O> {
	readonly [PARTIAL_OPTIONS]: O
	readonly [DEFAULT_OPTIONS]: DefaultUnknownTupleOptions
}

export class CustomUnknownTupleImpl<O extends Partial<UnknownTupleOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownTuple<O>
{
	readonly [SCHEMA_NAME] = 'UnknownTuple' as const

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
		? ReadonlyTuple<T>
		: O['isReadonlyTuple'] extends false
		? MutableTuple<T>
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
		else if (isArray(other)) return unknown.extends(other.getElementSchema)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!Array.isArray(x))
			issues.push(
				new ValidationIssue({
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
