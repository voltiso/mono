import { lazyConstructor } from "@voltiso/ts-util/class";
import { ISchema, Schema_ } from "../../schema.js";
import { EXTENDS } from "../../schema/_/symbols.js";
import { INever, IS_NEVER } from "./INever.js";
import {
	DefaultNeverOptions,
	defaultNeverOptions,
	NeverOptions,
} from "./_/NeverOptions";

class Never__<O extends NeverOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements INever<O>
{
	readonly [IS_NEVER] = true as const;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	override [EXTENDS](_other: ISchema): boolean {
		return true;
	}
}

//

export class Never_ extends Never__<DefaultNeverOptions> {
	constructor() {
		super(defaultNeverOptions as never);
	}
}
