import { IPath } from "./IPath.js";

export type Path<O> = O extends object
	? IPath &
			(
				| readonly []
				| {
						[k in keyof O]: readonly [k, ...Path<O[k]>];
				  }[keyof O]
			)
	: readonly [];
