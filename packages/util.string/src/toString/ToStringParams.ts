/* eslint-disable no-magic-numbers */
import {
	defaultIterationOptions,
	IterationOptions,
} from '@voltiso/util.object'

export interface ToStringParams extends IterationOptions {
	maxLength: number
}

export const defaultToStringParams = {
	...defaultIterationOptions,
	maxLength: 40 as const,
}
