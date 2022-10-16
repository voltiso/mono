// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomUnknownObject,
	DEFAULT_OPTIONS,
	DefaultUnknownObjectOptions,
	InferableObject,
	ISchema,
	UnknownObjectOptions,
} from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import { CALL, callableInstance, getKeys, lazyConstructor } from '@voltiso/util'
import * as s from '~/custom-schemas/object'
import { ValidationIssue } from '~/custom-schemas/validation'

import { CustomSchemaImpl } from '~/Schema'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownObjectImpl<O> {
	readonly [t.SCHEMA_NAME]: 'UnknownObject'

	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions
	readonly [BASE_OPTIONS]: UnknownObjectOptions
}

export class CustomUnknownObjectImpl<O extends Partial<UnknownObjectOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownObject<O>
{
	readonly [t.SCHEMA_NAME] = 'UnknownObject' as const

	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare readonly [OPTIONS]: Assume<
	// 	UnknownObjectOptions,
	// 	MergeSchemaOptions<DefaultUnknownObjectOptions, O>
	// >

	// eslint-disable-next-line class-methods-use-this
	get getIndexSignatures() {
		return [] as []
	}

	// eslint-disable-next-line class-methods-use-this
	get getShape() {
		return {}
	}

	index(...args: any) {
		const r = new s.CustomObjectImpl({
			...s.defaultObjectOptions,
			...this[t.OPTIONS],
		})

		return r.index(...(args as never))
	}

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<S extends InferableObject>(shape: S): t.Object<S> {
		return new s.Object(shape) as never
	}

	override [t.EXTENDS](other: ISchema): boolean {
		if (t.isObject(other)) {
			return getKeys(other.getShape).length === 0
		} else if (t.isUnknownObject(other)) return true
		else return super[t.EXTENDS](other)
	}

	protected override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'object' || x === null) {
			issues.push(
				new ValidationIssue({
					expectedDescription: 'be object',
					received: x,
				}),
			)
		}

		return issues
	}
}
