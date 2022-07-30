// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Constructor } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type {
	CustomInstance,
	DefaultInstanceOptions,
	InstanceOptions,
	ISchema,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	getConstructorName,
	isInstance,
	OPTIONS,
	SCHEMA_NAME,
	ValidationIssue,
} from '~'

export class CustomInstanceImpl<O extends Partial<InstanceOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomInstance<O>
{
	declare readonly [SCHEMA_NAME]: 'Instance';

	declare readonly [BASE_OPTIONS]: InstanceOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultInstanceOptions

	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare [OPTIONS]: Assume<
	// 	InstanceOptions,
	// 	MergeSchemaOptions<DefaultInstanceOptions, O>
	// >

	get getConstructor(): this[OPTIONS]['constructor'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].constructor as never
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
		return `instanceof ${this[OPTIONS].constructor.name}`
	}
}
