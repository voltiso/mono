/* eslint-disable @typescript-eslint/ban-types */
import { Nullish } from '../../null'
import { Merge2Nullish_ } from './Merge2Nullish'

export type MergeNNullish_<objs, acc> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object | Nullish]
		? MergeNNullish_<t, Merge2Nullish_<acc, h>>
		: acc
	: never

export type MergeNNullish<objs extends readonly (object | Nullish)[]> =
	MergeNNullish_<objs, {}>
