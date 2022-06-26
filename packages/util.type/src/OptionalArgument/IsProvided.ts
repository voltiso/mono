import type { IsAny } from "../IsAny.js";
import type { NotProvided } from "./OptionalArgument.js";

export type IsProvided<X, True = true, False = false> = IsAny<X> extends true
	? True
	: [X] extends [never]
	? True
	: X extends NotProvided
	? False
	: True;
