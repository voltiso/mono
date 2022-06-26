/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from "../../../misc/AlsoAccept.js";
import { OmitSignatures } from "./OmitSignatures.js";
import { Omit_ } from "./Omit_.js";

/** Discards index signatures */
export type OmitSimple_<O, K> = Omit_<OmitSignatures<O>, K>;

// O extends object
// 	? PickSimple_<O, Exclude<keyof OmitIndexSignatures<O>, K>>
// 	: never

/** Discards index signatures */
export type OmitSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = OmitSimple_<O, K>;
