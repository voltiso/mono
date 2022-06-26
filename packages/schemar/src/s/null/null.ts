import { lazyValue } from "@voltiso/ts-util";
import { literal } from "../literal.js";

const null_ = lazyValue(() => literal(null));
export { null_ as null };
