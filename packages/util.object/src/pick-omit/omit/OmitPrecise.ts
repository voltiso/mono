/* eslint-disable @typescript-eslint/no-explicit-any */
import { _, AlsoAccept } from "@voltiso/util.type";
import {
	HasSymbolIndexSignature,
	HasStringIndexSignature,
	HasNumberIndexSignature,
} from "../../HasIndexSignature";
import { Pick_ } from "../pick.js";
import { OmitSignatures } from "./OmitSignatures.js";

export type OmitPrecise_<O, K> = O extends object
	? _<
			Pick_<O, Exclude<keyof OmitSignatures<O>, K>> &
				(HasSymbolIndexSignature<O> extends true
					? symbol extends K
						? unknown
						: {
								[k: symbol]: symbol extends keyof O ? O[symbol] : never;
						  }
					: unknown) &
				(HasStringIndexSignature<O> extends true
					? string extends K
						? unknown
						: {
								[k: string]: string extends keyof O ? O[string] : never;
						  }
					: unknown) &
				(HasNumberIndexSignature<O> extends true
					? number extends K
						? unknown
						: {
								[k: number]: number extends keyof O ? O[number] : never;
						  }
					: unknown)
	  >
	: never;

export type OmitPrecise<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
> = OmitPrecise_<O, K>;
