// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schemable,
	CustomUnknownTuple,
	DefaultUnknownTupleOptions,
	SchemaLike,
	UnknownTupleOptions,
} from '@voltiso/schemar.types'
import { EXTENDS, SCHEMA_NAME } from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import type { DEFAULT_OPTIONS, PARTIAL_OPTIONS } from '@voltiso/util'
import { BoundCallable, CALL, lazyConstructor, OPTIONS } from '@voltiso/util'

import { unknown } from '~/base-schemas'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

import { MutableTuple, ReadonlyTuple } from '../Tuple'

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
		return BoundCallable(this) as never
	}

	[CALL]<T extends $$Schemable[]>(
		...shape: T
	): O['isReadonlyTuple'] extends true
		? t.ReadonlyTuple<T>
		: O['isReadonlyTuple'] extends false
		? t.MutableTuple<T>
		: never {
		if (this.isReadonlyTuple) return new ReadonlyTuple(shape) as never
		else return new MutableTuple(shape) as never
	}

	override [EXTENDS](other: SchemaLike): boolean {
		if (
			t.isUnknownTuple(other) &&
			this.isReadonlyTuple &&
			!other.isReadonlyTuple
		)
			return false

		if (t.isArray(other) && this.isReadonlyTuple && !other.isReadonlyArray)
			return false

		if (t.isUnknownTuple(other)) return true
		else if (t.isArray(other)) return unknown.extends(other.getElementSchema)
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): t.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!Array.isArray(x))
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expectedDescription: 'be array',
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
