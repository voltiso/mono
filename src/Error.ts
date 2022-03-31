// eslint-disable-next-line @typescript-eslint/ban-types
type TypeError = {
	Error: TypeError
}

export type Throw<message> = TypeError & message
