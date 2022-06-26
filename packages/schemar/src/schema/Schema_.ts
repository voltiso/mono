import { AtLeast1 } from "@voltiso/ts-util/array";
import { final } from "@voltiso/ts-util/class";
import { Merge2Simple } from "@voltiso/ts-util/object";
import { clone } from "@voltiso/ts-util/clone";
import { toString } from "@voltiso/ts-util/string";
import { ValidationError } from "../errors.js";
import { union } from "../s.js";
import { isUnion } from "../s/union.js";
import { isUnknownSchema } from "../s/unknownSchema.js";
import { ValidationResult } from "../s/validation/validationResult.js";
import { IRootSchema } from "./IRootSchema.js";
import { ISchema, IS_SCHEMA } from "./ISchema.js";
import { Schemable } from "./Schemable.js";
import { OPTIONS, SchemaOptions } from "./SchemaOptions.js";
import { processCustomChecks } from "./_/processCustomChecks.js";
import { isUnknown } from "../s/unknown.js";
import { CustomSchema } from "./CustomSchema.js";
import { throwTypeOnlyFieldError } from "./_/throwTypeOnlyFieldError.js";
import * as s from "../s.js";
import { EXTENDS } from "./_/symbols.js";

export abstract class Schema_<O extends SchemaOptions>
	implements CustomSchema<O>
{
	readonly [IS_SCHEMA] = true as const;
	[OPTIONS]: O;

	/** Type-only property (no value at runtime) */
	get Type(): O["_out"] {
		return throwTypeOnlyFieldError();
	}

	/** Type-only property (no value at runtime) */
	get OutputType(): O["_out"] {
		return throwTypeOnlyFieldError();
	}

	/** Type-only property (no value at runtime) */
	get InputType(): O["_in"] {
		return throwTypeOnlyFieldError();
	}

	get isOptional(): O["optional"] {
		return this[OPTIONS].optional;
	}

	get isReadonly(): O["readonly"] {
		return this[OPTIONS].readonly;
	}

	get getDefault(): O["default"] {
		return this[OPTIONS].default;
	}

	get getCustomChecks(): O["customChecks"] {
		return this[OPTIONS].customChecks;
	}

	constructor(o: O) {
		this[OPTIONS] = o;

		final(
			this,
			Schema_,
			"_fix",
			"extends",
			"tryValidate",
			"validate",
			"check",
			"toString"
		);
	}

	protected _cloneWithOptions<
		OO extends { readonly [k in keyof this[OPTIONS]]?: unknown }
	>(o: OO): CustomSchema<Merge2Simple<O, OO> & SchemaOptions> {
		const r = clone(this);
		r[OPTIONS] = { ...r[OPTIONS], ...o };
		return r as never;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected _getIssuesImpl(_x: unknown): s.ValidationIssue[] {
		return [];
	}

	protected _getIssues(x: unknown): s.ValidationIssue[] {
		if (typeof x === "undefined" && typeof this.getDefault !== "undefined")
			return [];
		else return this._getIssuesImpl(x);
	}

	protected _fixImpl(x: unknown): unknown {
		return x;
	}

	private _fix(x: unknown): unknown {
		const r = typeof x === "undefined" ? this.getDefault : x;
		return this._fixImpl(r);
	}

	tryValidate(x: unknown): ValidationResult<this["OutputType"]> {
		const value = this._fix(x);

		const issues = [
			...this._getIssues(value),
			...processCustomChecks(this.getCustomChecks, value),
		];

		if (issues.length === 0)
			return {
				isValid: true,
				value,
				issues: [],
			};
		else
			return {
				isValid: false,
				value,
				issues: issues as AtLeast1<s.ValidationIssue>,
			};
	}

	validate(x: unknown): this["OutputType"] {
		const r = this.tryValidate(x);
		if (r.isValid) return r.value;
		else throw new ValidationError(r.issues);
	}

	isValid(x: unknown): x is this["OutputType"] {
		return this.tryValidate(x).isValid;
	}

	[EXTENDS](other: ISchema): boolean {
		if (isUnion(other)) {
			for (const b of other.getSchemas) {
				if (this.extends(b as never)) return true;
			}
			return false;
		} else if (isUnknownSchema(other)) return true;
		else if (isUnknown(other)) return true;
		else return false;
	}

	extends(other: Schemable): boolean {
		const otherType = s.schema(other);

		if (this.isOptional && !otherType.isOptional) return false;
		if (this.isReadonly && !otherType.isReadonly) return false;

		return this[EXTENDS](otherType);
	}

	protected _toString() {
		return "unknown";
	}

	toString(): string {
		const prefix =
			this.isReadonly && this.isOptional
				? "readonly?:"
				: this.isReadonly
				? "readonly:"
				: this.isOptional
				? "?"
				: "";

		const suffix =
			typeof this.getDefault === "undefined"
				? ""
				: `=${toString(this.getDefault)}`;

		return `${prefix}${this._toString()}${suffix}`;
	}

	check(
		checkIfValid: (x: this["InputType"]) => boolean,
		expectedDescription?: string | ((x: this["InputType"]) => string)
	): never {
		const entry =
			typeof expectedDescription === "undefined"
				? {
						checkIfValid,
				  }
				: {
						checkIfValid,
						expectedDescription,
				  };

		return this._cloneWithOptions({
			customChecks: [...this.getCustomChecks, entry],
		}) as never;
	}

	get optional(): never {
		return this._cloneWithOptions({ optional: true as const }) as never;
	}

	get readonly(): never {
		return this._cloneWithOptions({ readonly: true as const }) as never;
	}

	default<D>(value: D): never {
		return this._cloneWithOptions({ default: value }) as never;
	}

	or<Other extends IRootSchema>(other: Other): never {
		// assert(isSchema(this), 'cannot make union of optional/readonly types (can only be used as object properties)')
		return union(this as never, other) as never;
	}
}
