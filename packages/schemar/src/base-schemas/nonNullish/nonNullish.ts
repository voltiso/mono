// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	lazyConstructor,
	lazyObject,
	OPTIONS,
} from '@voltiso/util'

import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { SchemaOptions } from '~/Schema/options/SchemaOptions'
import type { CustomSchema, CustomSchema$ } from '~/types/Schema/CustomSchema'
import type { $$Schema, Schema } from '~/types/Schema/ISchema'

$fastAssert(EXTENDS)
$fastAssert(OPTIONS)
$fastAssert(BASE_OPTIONS)
$fastAssert(DEFAULT_OPTIONS)

export interface $$NonNullish extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'NonNullish'
}

export function isNonNullishSchema(x: unknown): x is NonNullish$ {
	return (x as NonNullish$ | null)?.[SCHEMA_NAME] === 'NonNullish'
}

export interface NonNullishOptions extends SchemaOptions {
	// Output: {}
	// Input: {}
}

export declare namespace NonNullishOptions {
	export interface Default extends SchemaOptions.Default {
		Output: {}
		Input: {}
	}
}

export const defaultNonNullishOptions: NonNullishOptions.Default =
	defaultSchemaOptions as never

//

export interface CustomNonNullish<O extends Partial<NonNullishOptions>>
	extends CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'NonNullish'

	readonly [Voltiso.BASE_OPTIONS]: NonNullishOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NonNullishOptions.Default
}

export interface CustomNonNullish$<O extends Partial<NonNullishOptions>>
	extends CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'NonNullish'

	readonly [Voltiso.BASE_OPTIONS]: NonNullishOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NonNullishOptions.Default

	get Final(): CustomNonNullish<O>
}

//

export class CustomNonNullishImpl<
	O extends Partial<NonNullishOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'NonNullish' as const

	declare readonly [Voltiso.BASE_OPTIONS]: NonNullishOptions
	declare readonly [Voltiso.DEFAULT_OPTIONS]: NonNullishOptions.Default

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (x === null || x === undefined) {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'be non-nullish' },
					received: { value: x },
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override _toString(): string {
		return '{}'
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override [Voltiso.Schemar.EXTENDS](_other: Schema): boolean {
		throw new Error('Method not implemented.')
	}
}

export class NonNullishImpl extends lazyConstructor(
	() => CustomNonNullishImpl,
)<NonNullishOptions.Default> {
	constructor() {
		super(defaultNonNullishOptions)
	}
}

export interface NonNullish
	extends CustomNonNullish<NonNullishOptions.Default> {}

export interface NonNullish$
	extends CustomNonNullish$<NonNullishOptions.Default> {}

//

export const nonNullish: NonNullish$ = lazyObject(
	() => new NonNullishImpl(),
) as unknown as NonNullish$

export interface NonNullish$Constructor {
	new (): NonNullish$
}
