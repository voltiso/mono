import type { _ } from '@voltiso/util'

export interface Schema {
	get NonInlined(): _<{ a: 1 } & { b: 2 }>

	/** @inline */
	get Inlined(): _<{ a: 1 } & { b: 2 }>
}

const a = 0 as unknown as Schema

export type NonInlined = typeof a.NonInlined
export type Inlined = typeof a.Inlined

export type NonInlined2 = Schema['NonInlined']
export type Inlined2 = Schema['Inlined']
