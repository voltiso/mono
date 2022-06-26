import { IRootSchema, OPTIONS, Schema_ } from "../../schema.js";
import { EXTENDS } from "../../schema/_/symbols.js";
import { lazyConstructor } from "@voltiso/ts-util/class";
import { getConstructorName } from "./_/getConstructorName.js";
import {
	defaultInstanceOptions,
	InstanceOptions,
} from "./_/InstanceOptions.js";
import { isInstance, IS_INSTANCE } from "./IInstance.js";
import { CustomInstance } from "./CustomInstance.js";
import * as s from "..";

export class Instance__<O extends InstanceOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomInstance<O>
{
	readonly [IS_INSTANCE] = true as const;

	get getConstructor(): O["constructor"] {
		return this[OPTIONS].constructor;
	}

	constructor(o: O) {
		super(o);
	}

	override [EXTENDS](other: IRootSchema): boolean {
		if (isInstance(other)) return this.getConstructor === other.getConstructor;
		else return super[EXTENDS](other);
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x);
		if (!(x instanceof this.getConstructor)) {
			issues.push(
				new s.ValidationIssue({
					name: "instanceof",
					expected: this.getConstructor.name,
					received: getConstructorName(x),
				})
			);
		}
		return issues;
	}
}

export class Instance_<T extends object> extends Instance__<never> {
	constructor(constructor: abstract new (...args: never[]) => T) {
		super({ ...defaultInstanceOptions, constructor } as never);
	}
}
