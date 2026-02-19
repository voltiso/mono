// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { Constructor } from '@voltiso/util'
import {
	$fastAssert,
	lazyConstructor,
	OPTIONS,
	stringFrom,
} from '@voltiso/util'

import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'

import { _getInstanceConstructorName } from './_/getConstructorName'
import type { CustomInstance } from './CustomInstance'
import { isInstanceSchema } from './IInstance'
import type { InstanceOptions } from './InstanceOptions'

$fastAssert(OPTIONS)
$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomInstanceImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: InstanceOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: InstanceOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomInstanceImpl<O extends Partial<InstanceOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomInstance<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Instance' as const

	// declare readonly [PARTIAL_OPTIONS]: O;

	// declare [OPTIONS]: Assume<
	// 	InstanceOptions,
	// 	MergeSchemaOptions<DefaultInstanceOptions, O>
	// >

	get getConstructor(): this[Voltiso.OPTIONS]['Constructor'] {
		return this[Voltiso.OPTIONS].Constructor as never
	}

	// constructor(o: O) {
	// 	super(o)
	// }

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isInstanceSchema(other))
			return this.getConstructor === other.getConstructor
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (!(x instanceof this.getConstructor)) {
			const received = `${
				_getInstanceConstructorName(x) ?? '[unknown-constructor]'
			}(${stringFrom(x)})`

			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name
						? `instanceof ${this[Voltiso.OPTIONS].name}`
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
		return `instanceof ${this[Voltiso.OPTIONS].Constructor.name}`
	}
}
