// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
} from '@voltiso/util'

import { EXTENDS, SCHEMA_NAME } from '~/_/symbols'
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
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownTuple' as const

	declare readonly [Voltiso.DEFAULT_OPTIONS]: UnknownTupleOptions.Default
	declare readonly [Voltiso.BASE_OPTIONS]: UnknownTupleOptions

	get isReadonlyTuple(): this[Voltiso.OPTIONS]['isReadonlyTuple'] {
		return this[Voltiso.OPTIONS].isReadonlyTuple as never
	}

	get getMinLength(): this[Voltiso.OPTIONS]['minLength'] {
		return this[Voltiso.OPTIONS].minLength as never
	}

	get getMaxLength(): this[Voltiso.OPTIONS]['maxLength'] {
		return this[Voltiso.OPTIONS].maxLength as never
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

	override [Voltiso.Schemar.EXTENDS](other: SchemaLike): boolean {
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
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (!Array.isArray(x))
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
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
