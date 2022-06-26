import { CustomNever } from "./CustomNever.js";
import { lazyValue } from "@voltiso/ts-util";
import { Never_ } from "./Never_.js";
import { DefaultNeverOptions } from "./_/NeverOptions.js";

type NeverConstructor = new () => Never;

export type Never = CustomNever<DefaultNeverOptions>;
export const Never = Never_ as unknown as NeverConstructor;

export const never = lazyValue(() => new Never());
