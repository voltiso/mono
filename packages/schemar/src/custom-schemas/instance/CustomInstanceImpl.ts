// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	EXTENDS,
	OPTIONS,
	SCHEMA_NAME,
} from '_'
import type { Constructor } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type {
	CustomInstance,
	DefaultInstanceOptions,
	InstanceOptions,
	ISchema,
} from '~'
import {
	CustomSchemaImpl,
	getConstructorName,
	isInstance,
	ValidationIssue,
} from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomInstanceImpl<O> {
	readonly [BASE_OPTIONS]: InstanceOptions
	readonly [DEFAULT_OPTIONS]: DefaultInstanceOptions
}

export class CustomInstanceImpl<O extends Partial<InstanceOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomInstance<O>
{
	readonly [SCHEMA_NAME] = 'Instance' as const

	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare [OPTIONS]: Assume<
	// 	InstanceOptions,
	// 	MergeSchemaOptions<DefaultInstanceOptions, O>
	// >

	get getConstructor(): this[OPTIONS]['Constructor'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].Constructor as never
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [EXTENDS](other: ISchema): boolean {
		if (isInstance(other)) return this.getConstructor === other.getConstructor
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (!(x instanceof this.getConstructor)) {
			issues.push(
				new ValidationIssue({
					name: 'instanceof',
					expected: (this.getConstructor as unknown as Constructor).name,
					received: getConstructorName(x),
				}),
			)
		}

		return issues
	}

	override _toString(): string {
		// eslint-disable-next-line security/detect-object-injection
		return `instanceof ${this[OPTIONS].Constructor.name}`
	}
}
