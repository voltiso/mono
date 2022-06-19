import { array } from '../../array'
import { optional } from '../../misc'
import { number } from '../../number'
import { string } from '../../string'
import { union } from '../../union'
import { function as function_ } from '../../function'
import { tuple } from '../../tuple'
import { lazyValue } from '@voltiso/ts-util'

export const validationIssue = lazyValue(() => ({
	path: array(union(string, number)),
	name: string.optional,

	expectedOneOf: array.optional,
	expectedDescription: string.optional,

	received: optional,
	receivedDescription: string.optional,

	toString: function_(tuple(), string),
}))
