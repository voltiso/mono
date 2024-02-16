// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, Constructor, DEFAULT_OPTIONS } from '@voltiso/util'
import { $fastAssert, lazyConstructor, OPTIONS, stringFrom } from '@voltiso/util'

import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import { _getInstanceConstructorName } from './_/getConstructorName'
import type { CustomInstance } from './CustomInstance'
import { isInstanceSchema } from './IInstance'
import type { InstanceOptions } from './InstanceOptions'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomInstanceImpl<O> {
	readonly [BASE_OPTIONS]: InstanceOptions
	readonly [DEFAULT_OPTIONS]: InstanceOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
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
		return this[OPTIONS].Constructor as never
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [EXTENDS](other: Schema): boolean {
		if (isInstanceSchema(other))
			return this.getConstructor === other.getConstructor
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
					name: this[OPTIONS].name
						? `instanceof ${this[OPTIONS].name}`
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
		return `instanceof ${this[OPTIONS].Constructor.name}`
	}
}
