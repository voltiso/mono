import { type } from './symbol/type'

// eslint-disable-next-line @typescript-eslint/ban-types
export type StaticError = {
	[type]: 'StaticError'
}

export type Throw<message> = StaticError & message

// type X = Throw<'sdf' & { a: 1 }>
