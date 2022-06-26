import { SchemarError } from "../../errors.js";

export function throwTypeOnlyFieldError(): never {
	throw new SchemarError("Do not access `Out` at runtime (type-only field)");
}
