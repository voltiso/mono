// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	lazyConstructor,
	lazyValue,
	OPTIONS,
} from '@voltiso/util'

import type { ISchema, SchemaOptions } from '~'
import { CustomSchemaImpl, defaultSchemaOptions, ValidationIssue } from '~'

export interface NonNullishOptions extends SchemaOptions {
	Output: {}
	Input: {}
}

export interface DefaultNonNullishOptions extends SchemaOptions.Default {
	Output: {}
	Input: {}
}

export const defaultNonNullishOptions: DefaultNonNullishOptions =
	defaultSchemaOptions as never

export class CustomNonNullish<
	O extends Partial<NonNullishOptions>,
> extends lazyConstructor(() => CustomSchemaImpl)<O> {
	//
	readonly [SCHEMA_NAME] = 'NonNullish' as const;

	declare readonly [BASE_OPTIONS]: NonNullishOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultNonNullishOptions

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (x === null || x === undefined) {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be non-nullish' },
					received: { value: x },
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return '{}'
	}

	// eslint-disable-next-line class-methods-use-this
	override [EXTENDS](_other: ISchema): boolean {
		throw new Error('Method not implemented.')
	}
}

export class NonNullish extends lazyConstructor(
	() => CustomNonNullish,
)<DefaultNonNullishOptions> {
	constructor() {
		super(defaultNonNullishOptions)
	}
}

export const nonNullish = lazyValue(() => new NonNullish())
