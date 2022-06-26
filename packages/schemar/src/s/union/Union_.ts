import { lazyConstructor } from "@voltiso/ts-util/class";
import { AtLeast2 } from "@voltiso/ts-util/array";
import { RootSchemable, Schema_, OPTIONS, IRootSchema } from "../../schema.js";
import { EXTENDS } from "../../schema/_/symbols.js";
import {
	defaultUnionOptions,
	DefaultUnionOptions,
	UnionOptions,
} from "./_/UnionOptions";
import { Merge2Simple } from "@voltiso/ts-util/object";
import { CustomUnion } from "./CustomUnion.js";
import { isUnion, IS_UNION } from "./IUnion.js";
import { GetType_ } from "../../GetType.js";
import * as s from "..";

class Union__<O extends UnionOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements CustomUnion<O>
{
	readonly [IS_UNION] = true as const;

	get getSchemas(): this[OPTIONS]["schemas"] {
		return this[OPTIONS].schemas;
	}

	constructor(o: O) {
		super(o);
	}

	override [EXTENDS](other: IRootSchema): boolean {
		const otherTypes = isUnion(other) ? other.getSchemas : [other];

		for (const a of this.getSchemas) {
			let good = false;
			for (const b of otherTypes) {
				if (s.schema(a).extends(b)) {
					good = true;
					break;
				}
			}
			if (!good) return false;
		}
		return true;
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		let issues = super._getIssuesImpl(x);

		let valid = false;
		let moreIssues = [] as s.ValidationIssue[];
		for (const t of this.getSchemas) {
			const r = s.schema(t).tryValidate(x);
			if (r.isValid) valid = true;
			else moreIssues = [...moreIssues, ...r.issues];
		}

		if (!valid) {
			issues.push(
				new s.ValidationIssue({
					expectedOneOf: this.getSchemas.map((t) => s.schema(t).toString()),
					received: x,
				})
			);
			issues = [...issues, ...moreIssues];
		}

		return issues;
	}
}

export class Union_<T extends AtLeast2<RootSchemable>> extends Union__<
	Merge2Simple<
		DefaultUnionOptions,
		{
			schemas: T;
			_out: GetType_<T[number], { kind: "out" }>;
			_in: GetType_<T[number], { kind: "in" }>;
		}
	>
> {
	constructor(schemas: T) {
		super({ ...defaultUnionOptions, schemas } as never);
	}
}
