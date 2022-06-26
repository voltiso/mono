import { validationIssue } from "../validationIssue.js";
import { AtLeast1 } from "@voltiso/ts-util/array";
import { ValidationIssue } from "../../validation.js";
import { RootSchemable } from "../../../schema.js";
import * as s from "../..";

export const validationResult = <Value extends RootSchemable>(value: Value) =>
	s.union(
		{
			isValid: true,
			value,
			issues: s.tuple(),
		} as const,
		{
			isValid: false,
			value: s.unknown,
			issues: s.array(validationIssue).minLength(1),
		} as const
	);

export type IValidationResult<V = unknown> =
	| {
			readonly isValid: true;
			readonly value: V;
			readonly issues: [];
	  }
	| {
			readonly isValid: false;
			readonly value: unknown;
			readonly issues: AtLeast1<ValidationIssue>;
	  };

export type ValidationResult<V> = IValidationResult<V>;
