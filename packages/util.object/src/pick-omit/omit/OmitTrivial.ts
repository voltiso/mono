/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from "../../../misc/AlsoAccept.js";
import { Omit_ } from "./Omit_.js";

/** Does not work with index signatures */
export type OmitTrivial_<O, K> = Omit_<O, K>;

/** Discards index signatures */
export type OmitTrivial<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = OmitTrivial_<O, K>;
