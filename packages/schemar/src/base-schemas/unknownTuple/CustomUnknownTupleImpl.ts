// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$assert,
	BASE_OPTIONS,
	BoundCallable,
	CALL,
	DEFAULT_OPTIONS,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import type {
	$$Schemable,
	CustomUnknownTuple,
	SchemaLike,
	UnknownTupleOptions,
} from '~'
import { CustomSchemaImpl, isArraySchema, isUnknownTupleSchema } from '~'
import { isRest, unknown } from '~/base-schemas'
import { SchemarError } from '~/error'
import { ValidationIssue } from '~/meta-schemas'

import { MutableTuple, ReadonlyTuple } from '../tuple/Tuple'

$assert(EXTENDS)
$assert(SCHEMA_NAME)

export class CustomUnknownTupleImpl<O extends Partial<UnknownTupleOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownTuple<O>
{
	readonly [SCHEMA_NAME] = 'UnknownTuple' as const;

	declare readonly [DEFAULT_OPTIONS]: UnknownTupleOptions.Default;
	declare readonly [BASE_OPTIONS]: UnknownTupleOptions

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
		return BoundCallable(this) as never
	}

	[CALL]<T extends $$Schemable[]>(
		...shapeWithRest: T
	): O['isReadonlyTuple'] extends true
		? ReadonlyTuple<T>
		: O['isReadonlyTuple'] extends false
		? MutableTuple<T>
		: never {
		// eslint-disable-next-line es-x/no-array-string-prototype-at
		const lastElement = shapeWithRest.at(-1)

		const shape = isRest(lastElement)
			? shapeWithRest.slice(0, -1)
			: shapeWithRest

		for (const element of shape) {
			if (isRest(element))
				throw new SchemarError('Only last element can be rest')
		}

		if (this.isReadonlyTuple)
			return new ReadonlyTuple(...shapeWithRest) as never
		else return new MutableTuple(...shapeWithRest) as never
	}

	override [EXTENDS](other: SchemaLike): boolean {
		if (
			isUnknownTupleSchema(other) &&
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		if (isArraySchema(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		if (isUnknownTupleSchema(other)) return true
		else if (isArraySchema(other))
			return unknown.extends(other.getElementSchema)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (!Array.isArray(x))
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be array' },
					received: { value: x },
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
