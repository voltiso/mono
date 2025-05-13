// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BASE_OPTIONS,
	BoundCallable,
	CALL,
	DEFAULT_OPTIONS,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import { SchemarError } from '~/error/SchemarError'
import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { SchemaLike } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import { isArraySchema } from '../array/isArray'
import { isRest } from '../tuple/Rest'
import type { MutableTuple, ReadonlyTuple } from '../tuple/Tuple'
import { MutableTuple$, ReadonlyTuple$ } from '../tuple/Tuple'
import { unknown } from '../unknown/Unknown'
import type { CustomUnknownTuple } from './CustomUnknownTuple'
import { isUnknownTupleSchema } from './IUnknownTuple'
import type { UnknownTupleOptions } from './UnknownTupleOptions'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

export class CustomUnknownTupleImpl<O extends Partial<UnknownTupleOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownTuple<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [SCHEMA_NAME] = 'UnknownTuple' as const

	declare readonly [DEFAULT_OPTIONS]: UnknownTupleOptions.Default
	declare readonly [BASE_OPTIONS]: UnknownTupleOptions

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple'] {
		return this[OPTIONS].isReadonlyTuple as never
	}

	get getMinLength(): this[OPTIONS]['minLength'] {
		return this[OPTIONS].minLength as never
	}

	get getMaxLength(): this[OPTIONS]['maxLength'] {
		return this[OPTIONS].maxLength as never
	}

	constructor(o: O) {
		super(o)
		const newThis = BoundCallable(this)
		Object.freeze(newThis)
		// eslint-disable-next-line no-constructor-return
		return newThis
	}

	[CALL]<T extends $$Schemable[]>(
		...shapeWithRest: T
	): O['isReadonlyTuple'] extends true
		? ReadonlyTuple<T>
		: O['isReadonlyTuple'] extends false
			? MutableTuple<T>
			: never {
		// eslint-disable-next-line es-x/no-array-prototype-at
		const lastElement = shapeWithRest.at(-1)

		const shape = isRest(lastElement)
			? shapeWithRest.slice(0, -1)
			: shapeWithRest

		for (const element of shape) {
			if (isRest(element))
				throw new SchemarError('Only last element can be rest')
		}

		if (this.isReadonlyTuple)
			return new ReadonlyTuple$(...shapeWithRest) as never
		else return new MutableTuple$(...shapeWithRest) as never
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
		else return super[EXTENDS](other)
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (!Array.isArray(x))
			issues.push(
				new ValidationIssue({
					name: this[OPTIONS].name,
					expected: { description: 'be array' },
					received: { value: x },
				}),
			)

		return issues
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
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
