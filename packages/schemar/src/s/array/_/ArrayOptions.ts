import {
	defaultSchemaOptions,
	IRootSchema,
	SchemaOptions,
} from "../../../schema";
import { unknown } from "../../unknown.js";

export interface ArrayOptions extends SchemaOptions {
	_out: readonly unknown[];
	_in: readonly unknown[];

	element: IRootSchema;

	readonlyArray: boolean;

	minLength: number | undefined;
	maxLength: number | undefined;
}

//

const defaultArrayOptions = {
	...defaultSchemaOptions,
	element: unknown,
	minLength: undefined,
	maxLength: undefined,
};

export const defaultMutableArrayOptions = {
	...defaultArrayOptions,
	readonlyArray: false as const,
};

export type DefaultMutableArrayOptions = typeof defaultMutableArrayOptions;

//

export const defaultReadonlyArrayOptions = {
	...defaultArrayOptions,
	readonlyArray: true as const,
};

export type DefaultReadonlyArrayOptions = typeof defaultReadonlyArrayOptions;
