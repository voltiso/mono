import { lazyValue } from "@voltiso/ts-util";
import { CustomUnknown } from "./CustomUnknown.js";
import { Unknown_ } from "./Unknown_.js";
import { DefaultUnknownOptions } from "./_/UnknownOptions.js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Unknown extends CustomUnknown<DefaultUnknownOptions> {}

export const Unknown = Unknown_ as unknown as UnknownConstructor;

type UnknownConstructor = new () => Unknown;

export const unknown = lazyValue(() => new Unknown());
