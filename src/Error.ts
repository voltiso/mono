import { Type } from './Type'

// eslint-disable-next-line @typescript-eslint/ban-types
export type StaticError = {
	[Type]: 'StaticError'
}

export type Throw<message> = StaticError & message

// type X = Throw<'sdf' & { a: 1 }>
