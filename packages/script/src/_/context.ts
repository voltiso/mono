interface Context {
	signal?: AbortSignal | undefined
}

/** @internal */
export const context: Context = {}
