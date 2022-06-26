import { Merge2Simple } from "@voltiso/ts-util/object";
import { CustomInstance } from "./CustomInstance.js";
import { Instance_ } from "./Instance_.js";
import { DefaultInstanceOptions } from "./_/InstanceOptions.js";

export type Instance<Inst extends object> = CustomInstance<
	Merge2Simple<
		DefaultInstanceOptions,
		{
			constructor: abstract new (...args: never[]) => Inst;
			_out: Inst;
			_in: Inst;
		}
	>
>;

export const Instance = Instance_ as unknown as InstanceConstructor;

type InstanceConstructor = new <Inst extends object>(
	Constructor: abstract new (...args: never[]) => Inst
) => Instance<Inst>;

//

export function instance<Inst extends object>(
	Constructor: new (...args: never[]) => Inst
): Instance<Inst> {
	return new Instance(Constructor);
}
