export interface IterationOptions {
	includeSymbols: boolean
	includeNonEnumerable: boolean
}

export const defaultIterationOptions = {
	includeSymbols: false as const,
	includeNonEnumerable: false as const,
}

export type DefaultIterationOptions = typeof defaultIterationOptions
