import type { CustomInstance } from './CustomInstance'

export type Instance<Inst extends object> = CustomInstance<{
	constructor: abstract new (...args: any[]) => Inst
	Output: Inst
	Input: Inst
}>

export type InstanceConstructor = new <Inst extends object>(
	Constructor: abstract new (...args: any[]) => Inst,
) => Instance<Inst>
