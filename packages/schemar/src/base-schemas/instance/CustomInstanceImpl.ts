// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, Constructor, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert, lazyConstructor, OPTIONS, stringFrom } from '@voltiso/util'

import type { CustomInstance, InstanceOptions, ISchema } from '~'
import { CustomSchemaImpl, isInstanceSchema } from '~'
import { ValidationIssue } from '~/meta-schemas'

import { _getInstanceConstructorName } from './_/getConstructorName'

$assert(EXTENDS)
$assert(SCHEMA_NAME)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomInstanceImpl<O> {
	readonly [BASE_OPTIONS]: InstanceOptions
	readonly [DEFAULT_OPTIONS]: InstanceOptions.Default
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
		if (isInstanceSchema(other))
			return this.getConstructor === other.getConstructor
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (!(x instanceof this.getConstructor)) {
			const received = `${
				// eslint-disable-next-line etc/no-internal
				_getInstanceConstructorName(x) || '[unknown-constructor]'
			}(${stringFrom(x)})`

			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name
						? // eslint-disable-next-line security/detect-object-injection
						  `instanceof ${this[OPTIONS].name}`
						: 'instanceof',

					expected: {
						oneOfValues: [(this.getConstructor as unknown as Constructor).name],
					},

					received: { value: received },
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
