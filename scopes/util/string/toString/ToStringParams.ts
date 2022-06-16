/* eslint-disable no-magic-numbers */
import {
	defaultIterationOptions,
	IterationOptions,
} from '../../object/key-value/IterationOptions'

export interface ToStringParams extends IterationOptions {
	maxLength: number
}

export const defaultToStringParams = {
	...defaultIterationOptions,
	maxLength: 40 as const,
}
