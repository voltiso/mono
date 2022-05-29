/* eslint-disable @typescript-eslint/ban-types */
import { Merge2_ } from './Merge2'

type _MergeN<objs, acc extends object> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? _MergeN<t, Merge2_<acc, h>>
		: acc
	: never

export type MergeN<objs extends readonly object[]> = _MergeN<objs, {}>
