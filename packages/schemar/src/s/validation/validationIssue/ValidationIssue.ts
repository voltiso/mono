import { hasProperty } from '@voltiso/ts-util/object'
import { toString } from '@voltiso/ts-util/string'
import { GetOutputType } from '../../../GetType'
import * as s from '../..'
import { pathToString } from './_/pathToString'
import { expectedOneOfStr } from './_/expectedOneOfStr'

type ExpectedValue =
	| {
			expected: unknown
			expectedOneOf?: never
	  }
	| {
			expected?: never
			expectedOneOf: unknown[] | Set<unknown>
	  }

type ValidationIssueParams = {
	path?: string[]
	name?: string
} & (
	| {
			received: unknown
			receivedDescription?: string
	  }
	| {
			received?: unknown
			receivedDescription: string
	  }
) &
	(
		| (ExpectedValue & { expectedDescription?: string })
		| (Partial<ExpectedValue> & { expectedDescription: string })
	)

export class ValidationIssue
	implements GetOutputType<typeof s.validationIssue>
{
	path: (string | number)[]
	name?: string

	expectedOneOf?: unknown[]
	expectedDescription?: string

	received?: unknown
	receivedDescription?: string

	constructor(p: ValidationIssueParams) {
		this.path = p.path || []
		if (p.name) this.name = p.name
		if ('expected' in p || 'expectedOneOf' in p)
			this.expectedOneOf = p.expectedOneOf ? [...p.expectedOneOf] : [p.expected]
		if ('received' in p) this.received = p.received
		if ('receivedDescription' in p)
			this.receivedDescription = p.receivedDescription
		if ('expectedDescription' in p)
			this.expectedDescription = p.expectedDescription
	}

	toString(): string {
		const haveExpected = typeof this.expectedOneOf !== 'undefined'
		const haveExpectedDescription =
			typeof this.expectedDescription !== 'undefined'

		const want =
			haveExpected && haveExpectedDescription
				? `${this.expectedDescription as string} (${expectedOneOfStr(
						this.expectedOneOf as unknown[]
				  )})`
				: haveExpectedDescription
				? (this.expectedDescription as string)
				: `be ${expectedOneOfStr(this.expectedOneOf as unknown[])}`

		const haveReceived = hasProperty(this, 'received')
		const haveReceivedDescription =
			typeof this.receivedDescription !== 'undefined'

		const have =
			haveReceived && haveReceivedDescription
				? `${this.receivedDescription as string} (${toString(this.received)})`
				: haveReceivedDescription
				? (this.receivedDescription as string)
				: toString(this.received)

		const r = []
		if (this.path.length > 0) r.push(pathToString(this.path))
		if (this.name) r.push(this.name)
		r.push('should')
		r.push(want)
		r.push(`(got ${have})`)

		return r.join(' ')
	}
}
