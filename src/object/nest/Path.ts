import { IPath } from './IPath'

export type Path<O> = IPath &
	(
		| readonly []
		| {
				[k in keyof O]: readonly [k, ...Path<O[k]>]
		  }[keyof O]
	)
