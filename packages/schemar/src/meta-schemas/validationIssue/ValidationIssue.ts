// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

import type { NonStrictPartial } from '@voltiso/util'
import { stringFrom } from '@voltiso/util'

import { expectedOneOfStr } from './_/expectedOneOfStr'
import { pathToString } from './_/pathToString'
import type { ValidationIssueSeverity } from './sValidationIssueSeverity'

export class ValidationIssueImpl implements ValidationIssue {
	severity: 'error' | 'warning'

	path: (keyof any)[]
	name?: string

	expected: SchemarExpected
	received?: SchemarReceived

	constructor(p: ValidationIssueInput) {
		this.severity = p.severity ?? 'error'
		this.path = p.path || []

		if (p.name) this.name = p.name

		this.expected = p.expected
		if (p.received) this.received = p.received
	}

	// eslint-disable-next-line sonarjs/cyclomatic-complexity
	toString(
		options?: { skipReceived?: boolean | undefined } | undefined,
	): string {
		let want: string | undefined

		if (this.expected.description && this.expected.oneOfValues) {
			want = `${this.expected.description} (${expectedOneOfStr(
				this.expected.oneOfValues,
			)})`
		} else if (this.expected.description) {
			want = this.expected.description
		} else if (this.expected.oneOfValues) {
			want = `be ${expectedOneOfStr(this.expected.oneOfValues)}`
		}

		//

		const r = []

		if (this.path.length > 0) r.push(pathToString(this.path))

		if (this.name) r.push(this.name)

		r.push('should', want)

		if (!options?.skipReceived && this.received) {
			const have =
				'value' in this.received && this.received.description
					? `${this.received.description} (${stringFrom(this.received.value)})`
					: (this.received.description ?? stringFrom(this.received.value))

			const part = `(got ${have})`
			r.push(part)
		}

		return r.join(' ')
	}
}

export interface ValidationIssue {
	severity: ValidationIssueSeverity

	path: (keyof any)[]
	name?: string | undefined

	expected: SchemarExpected
	received?: SchemarReceived | undefined

	toString(
		options?:
			| NonStrictPartial<ValidationIssueTypes.ToStringOptions>
			| undefined,
	): string
}

export declare namespace ValidationIssueTypes {
	export interface ToStringOptions {
		/**
		 * Do not print the `.received` part
		 *
		 * @defaultValue `false`
		 */
		skipReceived: boolean
	}
}

export interface ValidationIssueConstructor {
	new (p: ValidationIssueInput): ValidationIssue
}

export const ValidationIssue =
	ValidationIssueImpl as unknown as ValidationIssueConstructor

//

//

export interface SchemarExpected {
	oneOfValues?: unknown[] | undefined // TODO: Iterable<unknown> and support iterables in schemar
	description?: string | undefined
}

export interface SchemarReceived {
	/** `undefined` is a valid value - use `exactOptionalPropertyTypes` */
	value?: unknown
	description?: string | undefined
}

export interface ValidationIssueInput {
	/**
	 * If just a `'warning'`, schema validation is considered successful anyway
	 *
	 * @defaultValue `'error'`
	 */
	severity?: ValidationIssueSeverity | undefined

	/**
	 * For nested structures
	 *
	 * @defaultValue `[]`
	 */
	path?: (keyof any)[] | undefined
	name?: string | undefined

	expected: SchemarExpected
	received?: SchemarReceived | undefined
}
