import type { TypeTag } from '@voltiso/util.type'

// eslint-disable-next-line @typescript-eslint/ban-types
export type StaticError = {
	[TypeTag]: "StaticError";
};

export type Throw<message> = StaticError & message

// type X = Throw<'sdf' & { a: 1 }>
