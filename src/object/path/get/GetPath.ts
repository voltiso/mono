import { Path } from '../Path'

type GetPath_<O, P> = P extends readonly []
	? O
	: O extends undefined | null
	? undefined
	: O extends object
	? P extends readonly [infer H, ...infer T]
		? H extends keyof O
			? GetPath_<O[H], T>
			: undefined
		: never
	: never

export type GetPath<O extends object | undefined | null, P extends Path<O>> = GetPath_<O, P>
